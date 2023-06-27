const nodemailer = require("nodemailer");
const config = require("../../../config");
const { db } = require("../../modules/DBConnection");

const reportGeneration = async (array) =>{
  let html = `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Photovoltaic System Report - [Startdate] - [EndDate]</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-zoom"></script>
    <style>
      /* CSS styles for the report */
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }

      h1 {
        text-align: center;
        margin-bottom: 20px;
      }

      .label-container {
        margin-bottom: 20px;
      }

      .label-container label {
        font-weight: bold;
        display: inline-block;
        width: 120px;
      }

      .separator {
        margin-top: 20px;
        border-top: 2px solid #000;
      }

      .section-title {
        font-weight: bold;
        font-size: 24px;
        margin-top: 30px;
        margin-bottom: 20px;
        text-align: center;
        text-transform: uppercase;
      }

      .product {
        margin-bottom: 20px;
      }

      .product label {
        font-weight: bold;
        display: block;
      }

      .chart-container {
        width: 90%;
        height: 800px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <h1 id="reportTitle">
      Photovoltaic System Report - [Startdate] - [EndDate]
    </h1>

    <div class="label-container">
      <label>Project ID:</label>
      <spanid id="projID">ABC123</span>
    </div>

    <div class="label-container">
      <label>Project Name:</label>
      <span id="projName">Sample Project</span>
    </div>

    <div class="separator"></div>

    <h2 class="section-title">Products Overview</h2>

    <div id="products-container"></div>

    <script>
        
        const dataArray = eval('${array}')

      
        var maxc = 6
        // for (var i = 0; i < jsonData.counters.length; i++) {
          //   var counter = jsonData.counters[i];
          //   console.log(counter.counter_name);
    
          // Group data by field_product_id and create an array of energy_dates and pvoutputs
          const groupedData = dataArray.reduce((groups, data) => {
            const { field_product_id, energy_date, pvoutput, ...otherValues } =
              data;
            if (!groups[field_product_id]) {
              groups[field_product_id] = {
                energy_dates: [],
                pvoutputs: [],
                ...otherValues,
              };
            }
            groups[field_product_id].energy_dates.push(energy_date);
            groups[field_product_id].pvoutputs.push(pvoutput);
            return groups;
          }, {});
    
          // Convert the grouped data object to an array
          const groupedArray = Object.entries(groupedData).map(
            ([field_product_id, values]) => ({
              field_product_id: parseInt(field_product_id),
              ...values,
            })
          );
    
          // Print the grouped array
          console.log(groupedArray);
    
          // JavaScript function to render products
          function renderProducts(groupedArray) {
            const productsContainer = document.getElementById("products-container");
    
            groupedArray.forEach((product) => {
              const productDiv = document.createElement("div");
              productDiv.className = "product";
    
              const productInfoDiv = document.createElement("div");
              productInfoDiv.className = "product-info";
    
              const productNameLabel = document.createElement("label");
              productNameLabel.textContent = "Company Product Name:";
              productInfoDiv.appendChild(productNameLabel);
    
              const productNameSpan = document.createElement("span");
              productNameSpan.textContent = product.company_product_name;
              productInfoDiv.appendChild(productNameSpan);
    
              const tiltAngleLabel = document.createElement("label");
              tiltAngleLabel.textContent = "Tilt Angle:";
              productInfoDiv.appendChild(tiltAngleLabel);
    
              const tiltAngleSpan = document.createElement("span");
              tiltAngleSpan.textContent = product.tilt + "°";
              productInfoDiv.appendChild(tiltAngleSpan);
    
              const orientationLabel = document.createElement("label");
              orientationLabel.textContent = "Orientation:";
              productInfoDiv.appendChild(orientationLabel);
    
              const orientationSpan = document.createElement("span");
              let orient;
              if (product.orientation === "S") orient = "South";
              else if (product.orientation === "E") orient = "East";
              else if (product.orientation === "W") orient = "West";
              else if (product.orientation === "N") orient = "North";
    
              orientationSpan.textContent = orient;
              productInfoDiv.appendChild(orientationSpan);
    
              const longitudeLabel = document.createElement("label");
              longitudeLabel.textContent = "Longitude:";
              productInfoDiv.appendChild(longitudeLabel);
    
              const longitudeSpan = document.createElement("span");
              longitudeSpan.textContent = product.lon;
              productInfoDiv.appendChild(longitudeSpan);
    
              const latitudeLabel = document.createElement("label");
              latitudeLabel.textContent = "Latitude:";
              productInfoDiv.appendChild(latitudeLabel);
    
              const latitudeSpan = document.createElement("span");
              latitudeSpan.textContent = product.lat;
              productInfoDiv.appendChild(latitudeSpan);
    
              productDiv.appendChild(productInfoDiv);
    
              const separator = document.createElement("hr");
              productDiv.appendChild(separator);
    
              const chartContainer = document.createElement("div");
              chartContainer.className = "chart-container";
              productDiv.appendChild(chartContainer);
    
              productsContainer.appendChild(productDiv);
              var energyOutputData = {
                labels: dataChange(product.energy_dates),
                values: product.pvoutputs,
              };
    
              const startDate = energyOutputData.labels[0];
              const endDate =
                energyOutputData.labels[energyOutputData.labels.length - 1];
    
              const reportTitle = document.getElementById("reportTitle");
              reportTitle.textContent = reportTitle.textContent
                .replace("[Startdate]", startDate)
                .replace("[EndDate]", endDate);
    
              const projName = document.getElementById("projName");
              projName.textContent = dataArray[0]["projName"];
    
              const projId = document.getElementById("projID");
              projId.textContent = dataArray[0]["idProject"];
              // Render the energy output chart for each product
    
              const maxDateLabel = document.createElement("label");
              maxDateLabel.textContent = "Maximum Energy Output:";
              productInfoDiv.appendChild(maxDateLabel);
              max = 0;
              for (var i = 0; i < energyOutputData.values.length; i++) {
                console.log(energyOutputData.values[i]);
                console.log(energyOutputData.values[max]);
                if (energyOutputData.values[i] > energyOutputData.values[max])
                  max = i;
              }
    
              const maxDateSpan = document.createElement("span");
              maxDateSpan.textContent =
                energyOutputData.labels[max] +
                " -- " +
                energyOutputData.values[max].toFixed(2) +
                " kW-h";
              productInfoDiv.appendChild(maxDateSpan);


              const totalEnergyOutput = document.createElement("label");
              totalEnergyOutput.textContent = "Total Energy Output:";
              productInfoDiv.appendChild(totalEnergyOutput);


              const sum = energyOutputData.values.reduce((acc, curr) => acc + curr, 0);

              const totalDateSpan = document.createElement("span");
              totalDateSpan.textContent =
                sum.toFixed(2) +
                " -- " +
                " kW-h";
              productInfoDiv.appendChild(totalDateSpan);

    
              // Check the number of dates
              if (energyOutputData.labels.length > 120) {
                // Create a new object to store month names as keys and summed values as values
                const monthlyData = {};
                maxc = 120
    
                // Iterate over the original arrays
                for (let i = 0; i < energyOutputData.labels.length; i++) {
                  var parts = energyOutputData.labels[i].split('/');
                  // parts[0] -> day
                  // parts[1] -> month
                  // parts[2] -> year
                
                  // JavaScript months are 0-based, so we need to subtract 1 from the month
                  var date = new Date(parts[2], parts[1] - 1, parts[0]);
                
                  const month = date.toLocaleString("default", { month: "long" });
    
                  if (!monthlyData.hasOwnProperty(month)) {
                    monthlyData[month] = 0;
                  }
    
                  monthlyData[month] += energyOutputData.values[i];
                }
    
                // Update labels and values arrays
                energyOutputData.labels.length = 0;
                energyOutputData.values.length = 0;
    
                // Populate labels and values arrays with monthly data
                for (const month in monthlyData) {
                  energyOutputData.labels.push(month);
                  energyOutputData.values.push(monthlyData[month]);
                }
              }
    
              renderEnergyOutputChart(energyOutputData, chartContainer);
            });
          }
    
          // JavaScript function to render the energy output chart
          function renderEnergyOutputChart(data, container) {
            const energyOutputChartElement = document.createElement("canvas");
            container.appendChild(energyOutputChartElement);
    
            const energyOutputData = {
              labels: data.labels,
              datasets: [
                {
                  label: "Energy Output (kWh)",
                  data: data.values,
                  backgroundColor: "rgba(75, 192, 192, 0.8)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            };
            const energyOutputChartOptions = {
              responsive: true,
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: maxc,
                  stepSize: 10,
                  title: {
                    display: true,
                    text: "Kilowatt-hours",
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: "Date",
                  },
                },
              },
              plugins: {
                zoom: {
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true,
                    },
                    mode: "xy",
                  },
                },
              },
            };
            const energyOutputChart = new Chart(energyOutputChartElement, {
              type: "bar",
              data: energyOutputData,
              options: energyOutputChartOptions,
            });
          }
    
          function dataChange(dates) {
            var a = [];
            dates.forEach((datesie) => {
              const date = new Date(datesie);
    
              // Format the date object into the desired format
              const formattedDate = date.toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              });
              a.push(formattedDate);
            });
            return a;
          }
    
          // Render the products
          renderProducts(groupedArray);
        </script>
      </body>
    </html>
    
    
`
return html
} 





const sendEmail = async (data) => {
  try {

    let htmlData = await reportGeneration(JSON.stringify(data))
    let htmlAttached = [{filename: "TestHello" ,content: htmlData, contentType: "text/html"}]

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.emails.sender,
        pass: config.emails.senderPwd,
      },
    });

    const mailOptions = {
      from: config.emails.sender,
      to: data[0].email,
      subject: "Report",
      html: '<h1>test</h1>',
      attachments: htmlAttached,

    };

    const response = await transporter.sendMail(mailOptions);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchDBReport = async (idProject) =>{
  const data = await new Promise((resolve, reject) => {
    db.query(
      `select email, field_product_id, orientation, tilt, cp.name as company_product_name, projects.name as projName, date as energy_date,pvoutput, lon, lat, idProject
      from projects inner join user on projects.assigned_user_id = user.idUser inner join field_product on field_product.project_id = projects.idProject inner join pv_energy on pv_energy.project_id = idProject and pv_energy.product_id = field_product_id inner join company_product cp on field_product.company_product_id = cp.product_id
      WHERE idProject='${idProject}'`,
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });

  sendEmail(data)
}

const fetchDBReport_toShow = async (idProject) =>{
  const data = await new Promise((resolve, reject) => {
    db.query(
      `select email, field_product_id, orientation, tilt, cp.name as company_product_name, projects.name as projName, date as energy_date,pvoutput, lon, lat, idProject
      from projects inner join user on projects.assigned_user_id = user.idUser inner join field_product on field_product.project_id = projects.idProject inner join pv_energy on pv_energy.project_id = idProject and pv_energy.product_id = field_product_id inner join company_product cp on field_product.company_product_id = cp.product_id
      WHERE idProject='${idProject}'`,
      (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });

  let htmlData = await reportGeneration(JSON.stringify(data))
  return htmlData
}  


module.exports = {
fetchDBReport,
fetchDBReport_toShow
};


