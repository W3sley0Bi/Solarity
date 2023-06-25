const nodemailer = require("nodemailer");
const config = require("../../../config");
const { db } = require("../../modules/DBConnection");

const sendEmail = async (idUser, html, attachments) => {
  try {
    const userEmail = await new Promise((resolve, reject) => {
      db.query(
        `SELECT email FROM user WHERE idUser='${idUser}'`,
        (err, result, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emails.sender,
        pass: config.emails.senderPwd,
      },
    });

    const mailOptions = {
      from: config.emails.sender,
      to: config.emails.receivers,
      subject: "Report ",
      html: html, //html page
      attachments: attachments,
      /*
        let attachments = [{
            filename: "filenameTest.pdf",
            content: pdfBytes,
        }]
    */
    };

    const response = await transporter.sendMail(mailOptions);

    return response;
  } catch (error) {
    console.log(error);
  }
};
// let html = `<!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <title>Photovoltaic System Report - [Startdate] - [EndDate]</title>
//     <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
//     <style>
//         /* CSS styles for the report */
//         body {
//             font-family: Arial, sans-serif;
//             margin: 20px;
//         }

//         h1 {
//             text-align: center;
//             margin-bottom: 20px;
//         }

//         .label-container {
//             margin-bottom: 20px;
//         }

//         .label-container label {
//             font-weight: bold;
//             display: inline-block;
//             width: 120px;
//         }

//         .separator {
//             margin-top: 20px;
//             border-top: 2px solid #000;
//         }

//         .section-title {
//             font-weight: bold;
//             font-size: 24px;
//             margin-top: 30px;
//             margin-bottom: 20px;
//             text-align: center;
//             text-transform: uppercase;
//         }

//         .product {
//             margin-bottom: 20px;
//         }

//         .product label {
//             font-weight: bold;
//             display: block;
//         }

//         .chart-container {
//             width: 600px;
//             height: 400px;
//             margin: 0 auto;
//         }
//     </style>
// </head>
// <body>
//     <h1>Photovoltaic System Report - [Startdate] - [EndDate]</h1>

//     <div class="label-container">
//         <label>Project ID:</label>
//         <span>ABC123</span>
//     </div>

//     <div class="label-container">
//         <label>Project Name:</label>
//         <span>Sample Project</span>
//     </div>

//     <div class="separator"></div>

//     <h2 class="section-title">Products Overview</h2>

//     <div id="products-container"></div>

//     <script>
//         // JavaScript function to render products
//         function renderProducts(products) {
//             const productsContainer = document.getElementById('products-container');

//             products.forEach(product => {
//                 const productDiv = document.createElement('div');
//                 productDiv.className = 'product';

//                 const productInfoDiv = document.createElement('div');
//                 productInfoDiv.className = 'product-info';

//                 const productNameLabel = document.createElement('label');
//                 productNameLabel.textContent = 'Company Product Name:';
//                 productInfoDiv.appendChild(productNameLabel);

//                 const productNameSpan = document.createElement('span');
//                 productNameSpan.textContent = product.name;
//                 productInfoDiv.appendChild(productNameSpan);

//                 const tiltAngleLabel = document.createElement('label');
//                 tiltAngleLabel.textContent = 'Tilt Angle:';
//                 productInfoDiv.appendChild(tiltAngleLabel);

//                 const tiltAngleSpan = document.createElement('span');
//                 tiltAngleSpan.textContent = product.tiltAngle;
//                 productInfoDiv.appendChild(tiltAngleSpan);

//                 const orientationLabel = document.createElement('label');
//                 orientationLabel.textContent = 'Orientation:';
//                 productInfoDiv.appendChild(orientationLabel);

//                 const orientationSpan = document.createElement('span');
//                 orientationSpan.textContent = product.orientation;
//                 productInfoDiv.appendChild(orientationSpan);

//                 const energyOutputLabel = document.createElement('label');
//                 energyOutputLabel.textContent = 'Energy Output (kWh):';
//                 productInfoDiv.appendChild(energyOutputLabel);

//                 const energyOutputSpan = document.createElement('span');
//                 energyOutputSpan.textContent = product.energyOutput;
//                 productInfoDiv.appendChild(energyOutputSpan);

//                 const longitudeLabel = document.createElement('label');
//                 longitudeLabel.textContent = 'Longitude:';
//                 productInfoDiv.appendChild(longitudeLabel);

//                 const longitudeSpan = document.createElement('span');
//                 longitudeSpan.textContent = product.longitude;
//                 productInfoDiv.appendChild(longitudeSpan);

//                 const latitudeLabel = document.createElement('label');
//                 latitudeLabel.textContent = 'Latitude:';
//                 productInfoDiv.appendChild(latitudeLabel);

//                 const latitudeSpan = document.createElement('span');
//                 latitudeSpan.textContent = product.latitude;
//                 productInfoDiv.appendChild(latitudeSpan);

//                 productDiv.appendChild(productInfoDiv);

//                 const separator = document.createElement('hr');
//                 productDiv.appendChild(separator);

//                 const chartContainer = document.createElement('div');
//                 chartContainer.className = 'chart-container';
//                 productDiv.appendChild(chartContainer);

//                 productsContainer.appendChild(productDiv);

//                 // Render the energy output chart for each product
//                 renderEnergyOutputChart(product.energyOutputData, chartContainer);
//             });
//         }

//         // JavaScript function to render the energy output chart
//         function renderEnergyOutputChart(data, container) {
//             const energyOutputChartElement = document.createElement('canvas');
//             container.appendChild(energyOutputChartElement);

//             const energyOutputData = {
//                 labels: data.labels,
//                 datasets: [{
//                     label: 'Energy Output (kWh)',
//                     data: data.values,
//                     backgroundColor: 'rgba(75, 192, 192, 0.8)',
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 1
//                 }]
//             };
//             const energyOutputChartOptions = {
//                 responsive: true,
//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         title: {
//                             display: true,
//                             text: 'Kilowatt-hours'
//                         }
//                     },
//                     x: {
//                         title: {
//                             display: true,
//                             text: 'Date'
//                         }
//                     }
//                 }
//             };
//             const energyOutputChart = new Chart(energyOutputChartElement, {
//                 type: 'bar',
//                 data: energyOutputData,
//                 options: energyOutputChartOptions
//             });
//         }

//         // Sample data
//         const productsData = [
//             {
//                 name: 'Sample Product 1',
//                 tiltAngle: '30 degrees',
//                 orientation: 'South',
//                 energyOutput: '100 kWh',
//                 longitude: '50.1234',
//                 latitude: '20.5678',
//                 energyOutputData: {
//                     labels: ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05'],
//                     values: [120, 150, 90, 180, 200]
//                 }
//             },
//             {
//                 name: 'Sample Product 2',
//                 tiltAngle: '20 degrees',
//                 orientation: 'East',
//                 energyOutput: '85 kWh',
//                 longitude: '51.2345',
//                 latitude: '21.6789',
//                 energyOutputData: {
//                     labels: ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05'],
//                     values: [100, 130, 110, 160, 190]
//                 }
//             }
//         ];

//         // Render the products
//         renderProducts(productsData);
//     </script>
// </body>
// </html>
// `
// sendEmail(7,'<h1>test</h1>',[{filename: "Test Hello" ,content: html, contentType: "text/html"}]);

module.exports = {
  sendEmail,
};


