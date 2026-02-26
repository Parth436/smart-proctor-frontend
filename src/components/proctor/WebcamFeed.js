import { useEffect, useRef, useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

export default function WebcamFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const classifierRef = useRef(null);
  const initializedRef = useRef(false);

  const [status, setStatus] = useState("Loading OpenCV...");
  const [faceCount, setFaceCount] = useState(0);

  useEffect(() => {
    startCamera();
    waitForOpenCV();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });

      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const waitForOpenCV = () => {
  const check = setInterval(() => {
    if (window.cv && window.cv.Mat) {
      clearInterval(check);

      if (window.cv.onRuntimeInitialized) {
        window.cv.onRuntimeInitialized = initializeOpenCV;
      } else {
        // Runtime already initialized
        initializeOpenCV();
      }
    }
  }, 100);
};

  const initializeOpenCV = async () => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    setStatus("OpenCV Ready");

    await loadCascade();
    startDetection();
  };

  const loadCascade = async () => {
    const cv = window.cv;

    try {
      const response = await fetch("/haarcascade_frontalface_default.xml");
      const data = new Uint8Array(await response.arrayBuffer());

      cv.FS_createDataFile("/", "face.xml", data, true, false, false);

      const classifier = new cv.CascadeClassifier();
      const loaded = classifier.load("face.xml");

      if (!loaded) {
        console.error("Cascade failed to load");
        setStatus("Cascade Load Failed");
        return;
      }

      classifierRef.current = classifier;
      console.log("Cascade loaded successfully");
    } catch (err) {
      console.error("Cascade loading error:", err);
      setStatus("Cascade Load Error");
    }
  };

  const startDetection = () => {
    const cv = window.cv;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const detect = () => {
      if (!video.videoWidth || !classifierRef.current) {
        animationRef.current = requestAnimationFrame(detect);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0);

      let src = cv.imread(canvas);
      let gray = new cv.Mat();
      let blurred = new cv.Mat();
      let faces = new cv.RectVector();

      cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
      cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

      classifierRef.current.detectMultiScale(
        blurred,
        faces,
        1.2,                 // scale factor
        6,                   // minNeighbors
        0,
        new cv.Size(80, 80)  // minimum face size
      );

      setFaceCount(faces.size());

      for (let i = 0; i < faces.size(); i++) {
        let face = faces.get(i);

        let p1 = new cv.Point(face.x, face.y);
        let p2 = new cv.Point(
          face.x + face.width,
          face.y + face.height
        );

        cv.rectangle(src, p1, p2, [255, 0, 0, 255], 2);
      }

      cv.imshow(canvas, src);

      src.delete();
      gray.delete();
      blurred.delete();
      faces.delete();

      animationRef.current = requestAnimationFrame(detect);
    };

    detect();
  };

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="subtitle1">
        Live Proctoring Feed
      </Typography>

      <Typography color="secondary">
        {status} | Faces Detected: {faceCount}
      </Typography>

      <Box sx={{ position: "relative" }}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "100%",
            border: "2px solid #1a237e",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
          }}
        />
      </Box>
    </Paper>
  );
}