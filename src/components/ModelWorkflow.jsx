import { useState } from "react";
import "../model-workflow.css";

const models = [
  {
    id: "heart",
    name: "Heart sound model",
    architecture: "LeNet-style CNN",
    input: "16 kHz mono",
    output: "Normal / murmur",
    source: "Thesis: training pp. 33–36; inference pp. 38–39.",
    training: [
      [
        "Heart sound recordings",
        "Start with the heart-sound dataset for normal-versus-murmur classification.",
      ],
      [
        "Standardize & filter",
        "Convert to mono at 16 kHz and normalize amplitude. Apply a 25–800 Hz band-pass filter, with an optional notch filter.",
      ],
      [
        "Extract audio features",
        "Transform audio into Mel-spectrograms and save the features for reuse during training.",
      ],
      [
        "Prepare training data",
        "Load training/validation CSV splits into TensorFlow datasets. Use 50/50 balanced sampling of normal and murmur examples.",
      ],
      [
        "Train the LeNet-style CNN",
        "Validate after each epoch and retain the checkpoint with the best validation performance.",
      ],
      [
        "Evaluate & set the threshold",
        "Evaluate on test data using a confusion matrix, F1-score, and ROC-AUC. Choose a deployment threshold using the recall/F1 trade-off.",
      ],
      [
        "Export the heart model",
        "Convert the selected model to TensorFlow Lite for embedded inference.",
        "heart_model.tflite",
      ],
    ],
    inference: [
      [
        "Capture heart audio",
        "Record through the microphone or upload a heart-sound WAV file.",
      ],
      [
        "Match training preprocessing",
        "Standardize to 16 kHz mono, normalize, and apply the heart-sound filter.",
      ],
      [
        "Create a Mel-spectrogram",
        "Convert the recording into the feature representation expected by the heart model.",
      ],
      [
        "Run heart-model inference",
        "Use the heart TensorFlow Lite model to produce normal and murmur probabilities.",
        "heart_model.tflite",
      ],
      [
        "Apply the decision threshold",
        "Compare the murmur probability with the deployment threshold to return normal or abnormal (murmur).",
      ],
      [
        "Present & save the prediction",
        "Display the model result, confidence, and supporting BPM estimate. Save the analysis in session history.",
      ],
    ],
  },
  {
    id: "lung",
    name: "Lung sound model",
    architecture: "Four-class CNN",
    input: "8 kHz mono",
    output: "Normal / crackles / wheezes / both",
    source: "Thesis: training pp. 40–43; inference pp. 45–46.",
    training: [
      [
        "Lung sound recordings",
        "Start with respiratory recordings representing normal, crackles, wheezes, and both abnormal sounds.",
      ],
      [
        "Standardize & segment",
        "Resample to 8 kHz mono, normalize amplitude, and band-pass filter. Divide recordings into 10-second windows, optionally with overlap.",
      ],
      [
        "Extract audio features",
        "Create Mel-spectrograms from the segments and store the features as NumPy (.npy) files.",
      ],
      [
        "Prepare training data",
        "Separate training, validation, and test subsets. Balance sampling across the four respiratory classes.",
      ],
      [
        "Train the four-class CNN",
        "Train the lung classifier on the extracted features and monitor validation performance.",
      ],
      [
        "Evaluate & select the model",
        "Assess predictions using a confusion matrix, accuracy, and F1-score. Select the model with the best validation performance.",
      ],
      [
        "Export the lung model",
        "Convert the selected lung classifier to TensorFlow Lite for embedded inference.",
        "lung_model.tflite",
      ],
    ],
    inference: [
      [
        "Capture lung audio",
        "Record through the microphone or upload a lung-sound WAV file.",
      ],
      [
        "Match training preprocessing",
        "Standardize to 8 kHz mono, normalize, and filter the lung recording before feature extraction.",
      ],
      [
        "Create a Mel-spectrogram",
        "Convert the recording into the feature representation expected by the lung model.",
      ],
      [
        "Run lung-model inference",
        "Use the separate lung TensorFlow Lite model to produce respiratory-class probabilities.",
        "lung_model.tflite",
      ],
      [
        "Apply class thresholds",
        "Return crackles, wheezes, or both when an abnormal-class probability exceeds its threshold; otherwise return normal.",
      ],
      [
        "Present & save the prediction",
        "Display the model result, confidence, and supporting breathing-rate estimate. Save the analysis in session history.",
      ],
    ],
  },
];

export default function ModelWorkflow() {
  const [mode, setMode] = useState("training");
  return (
    <section className="model-workflow" aria-labelledby="model-workflow-title">
      <div className="workflow-heading">
        <div>
          <p className="showcase-eyebrow">MACHINE-LEARNING WORKFLOW</p>
          <h3 id="model-workflow-title">Two models. Two sound domains.</h3>
        </div>
        <div
          className="workflow-mode"
          role="group"
          aria-label="Choose model workflow"
        >
          <button
            type="button"
            className="showcase-button"
            aria-pressed={mode === "training"}
            aria-controls="model-workflow-diagram"
            onClick={() => setMode("training")}
          >
            Model training
          </button>
          <button
            type="button"
            className="showcase-button"
            aria-pressed={mode === "inference"}
            aria-controls="model-workflow-diagram"
            onClick={() => setMode("inference")}
          >
            On-device inference
          </button>
        </div>
      </div>
      <p className="workflow-intro">
        The heart and lung classifiers have separate preprocessing settings,
        output classes, and TensorFlow Lite model files.{" "}
        {mode === "training"
          ? "This is how each model is prepared and trained."
          : "This is how each trained model is used for a new recording."}
      </p>
      <p className="sr-only" role="status">
        Showing {mode === "training" ? "model training" : "on-device inference"}{" "}
        for both models.
      </p>
      <div className="workflow-lanes" id="model-workflow-diagram">
        {models.map((model) => (
          <article
            className="workflow-lane"
            key={model.id}
            aria-labelledby={`workflow-${model.id}-title`}
          >
            <header className="workflow-lane-header">
              <p className="showcase-eyebrow">{model.architecture}</p>
              <h4 id={`workflow-${model.id}-title`}>{model.name}</h4>
              <div className="workflow-facts">
                <span>{model.input}</span>
                <span>{model.output}</span>
              </div>
            </header>
            <ol
              className="workflow-steps"
              aria-label={`${model.name}: ${mode === "training" ? "training" : "inference"} steps`}
            >
              {model[mode].map(([title, description, artifact], index) => (
                <li className="workflow-step" key={`${mode}-${index}`}>
                  <span className="workflow-step-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h5>{title}</h5>
                    <p>{description}</p>
                    {artifact && <code>{artifact}</code>}
                  </div>
                </li>
              ))}
            </ol>
            <p className="workflow-source">{model.source}</p>
          </article>
        ))}
      </div>
      <p className="media-note">
        Research prototype workflow, summarized from the thesis methodology.
        Classification outputs are model predictions, not clinically validated
        diagnoses.
      </p>
    </section>
  );
}
