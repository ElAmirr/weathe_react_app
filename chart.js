const api = {
    key: "7d599ce045a697247a327dd3f4029960",
    basurl: "https://pro.openweathermap.org/data/2.5/forecast/hourly?",
    iconurl: 'http://openweathermap.org/img/wn/'  
}

window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            fetch(`${api.basurl}lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
                .then(responce => {
                    return responce.json();
                })
                .then(apidata => {
                    const d = new Date();
                    let hour = d.getHours();
                    let labels = [];
                    let dataY = [];
                    for(i=0; i <= 23; i++) {
                        dataY.push(apidata.list[i].main.temp); 
                        labels.push(((hour+i) % 24 + ''));
                    }
                        console.log(dataY);
                        console.log(labels);
                        
                    const ctx = document.querySelector('#myChart').getContext('2d');
                    let delayed

                    //Gradient Fill 
                    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, "#44a08d");
                    gradient.addColorStop(1, "#093637");

                    const data = {
                        labels,
                        datasets: [
                            {
                                data: dataY,
                                label: "Temperature",
                                fill: true,
                                backgroundColor: gradient,
                                borderColor: "#44a08d",
                                pointBackgroundColor: "#fff",
                                
                            },
                        ],
                    };
                    const config = {
                        type: "line",
                        data: data,
                        options: {
                            radius: 0,
                            hitRadius: 30,
                            hoverRadius: 0,
                            responsive: true,
                            animation: {
                                onComplete: () => {
                                  delayed = true;
                                },
                                delay: (context) => {
                                  let delay = 0;
                                  if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                                  }
                                  return delay;
                                },
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        callback: function (dataY) {
                                            return dataY + "°C";
                                        },
                                    },
                                },
                            },
                            
                        },
                    };
                    Chart.defaults.scales.linear.min = 0;

                    const myChart = new Chart(ctx, config);
                });
            });
        }
    });