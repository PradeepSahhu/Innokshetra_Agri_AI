import React, { useEffect } from "react";
import Header from "../header/Header";
import "./CropResult.css";
import { useNavigate, useLocation } from "react-router-dom";
import { output_descriptions, label_image_paths } from "../crop/CropOutputs";
import { Chart } from "chart.js/auto";
import axios from "axios";

//----------------------------------------------------------

// Function to create a radar chart
async function createBarGraph() {
  let sensorData;
  try {
    // const { temperatrure, pressure, altitude, waterLevel }
    // const sensor_data = await axios.get("http://localhost:3000/");
    // sensorData = sensor_data.data.split(",");
    // console.log(sensor_data.data);
    // console.log(data);
  } catch (error) {
    console.log("this is not fetching data from backend");
  }

  console.log("this function is executing");
  const data = {
    labels: ["Temperature"],
    values: [sensorData ? sensorData[0] : 37.5],
  };
  //   if (!data) return;

  const ctx = document.getElementById("barGraphTemp").getContext("2d");

  // Create radar chart using Chart.js
  const radarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Soil Analysis",
          data: data.values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 100,
        },
        r: {
          beginAtZero: false,
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    },
  });

  const datas = {
    labels: ["Humidity", ""],
    values: [sensorData ? sensorData[3] : 700],
  };
  //   if (!data) return;

  const ctxx = document.getElementById("barGraphPressure").getContext("2d");

  // Create radar chart using Chart.js
  const radarChartTwo = new Chart(ctxx, {
    type: "bar",
    data: {
      labels: datas.labels,
      datasets: [
        {
          label: "Soil Analysis",
          data: datas.values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 20,
          max: 1000,
        },
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 50,
        },
      },
    },
  });
}

async function createLineGraph() {
  const data = {
    labels: ["Humidity", ""],
    values: [68],
  };
  //   if (!data) return;

  const ctx = document.getElementById("barGraphPressure").getContext("2d");

  // Create radar chart using Chart.js
  const radarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Soil Analysis",
          data: data.values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          min: 20,
          max: 100,
        },
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 50,
        },
      },
    },
  });
}

async function createLineAltitude() {
  const data = {
    labels: ["Rainfall (in mm)"],
    values: [800],
  };
  //   if (!data) return;

  const ctx = document.getElementById("barGraphHumidity").getContext("2d");

  // Create radar chart using Chart.js
  const radarChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: "Soil Analysis",
          data: data.values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 1000,
      },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 50,
        },
      },
    },
  });
}

async function createBubbleGraph() {
  console.log("this function is executing");

  // Define multiple datasets for various parameters
  const data = {
    labels: [
      "Nitrogen",
      "Phosphorus",
      "Humidity",
      "Potassium",
      "Rainfall (in mm)",
    ],
    datasets: [
      {
        label: "Soil Analysis - Sample 1",
        data: [20, 30, 40, 50, 60],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Soil Analysis - Sample 2",
        data: [50, 45, 30, 70, 80],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Soil Analysis - Sample 3",
        data: [35, 60, 25, 55, 90],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const ctx = document.getElementById("radarChart").getContext("2d");

  // Create radar chart with multiple datasets
  const radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: data.labels, // Parameters
      datasets: data.datasets, // Multiple datasets
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    },
  });
}

export function CropResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state;

  console.log("LOCATION : ", location);
  console.log("LOCATION STATE : ", locationState);

  // Runs at Initial Render. Redirects if State is null.
  useEffect(() => {
    if (locationState == null) {
      console.log("Redirecting to /crop...");
      navigate("/crop");
    }
  }, [locationState, navigate]);

  if (locationState == null) {
    console.log("LocationState is null");
    return null;
  }

  const predicted_crop = locationState["predicted_crop"];
  const output_image_path = label_image_paths[predicted_crop.toLowerCase()];
  console.log("Predicted Crop : ", predicted_crop);
  console.log("Image Path : ", output_image_path);

  useEffect(() => {
    createBarGraph();
    // createLineGraph();
    createLineAltitude();
    createBubbleGraph();
  }, []);

  return (
    <>
      <Header />
      <div className="main-container">
        <p className="crop-result-p">
          {" "}
          You should grow <b> {predicted_crop.toUpperCase()} </b> in your farm !
        </p>
        <img className="crop-result-img" src={output_image_path} />
        <p className="crop-result-description">
          {" "}
          {output_descriptions[predicted_crop]}{" "}
        </p>
        <button className="crop-try-btn" onClick={() => navigate("/crop")}>
          {" "}
          Try again ?{" "}
        </button>
        <div className="graph-container">
          <canvas id="barGraphTemp"></canvas>
          <canvas id="barGraphPressure"></canvas>
          <canvas id="barGraphHumidity"></canvas>
          <canvas id="radarChart"></canvas>
        </div>
      </div>
    </>
  );
}
