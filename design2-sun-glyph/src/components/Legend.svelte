<svg class="pie" viewBox="0 0 32 32" width="50"></svg>

<svg class="beams" viewBox="0 0 32 32" width="50">
    <path
        style="transform: translate(45%, 60%) rotate(12deg)"
        d="M 0,0  L 80,0"
    />
    <path
        style="transform: translate(50%, 50%) rotate(0deg)"
        d="M 0,0  L 10,0"
    />
    <path
        style="transform: translate(45%, 40%) rotate(-12deg)"
        d="M 0,0  L 14,0"
    />

</svg>


<svg class = "pie-text" width="200" height="100">
    <text class = "legend" x="10%" y="50%"  >
      Average total inbound lead times <tspan x="10%" dy="1.2em">(larger circle = longer times)</tspan>
    </text>
  </svg>
  <svg class = "beams-text" width="250" height="100">
    <text class = "legend" x="10%" y="50%"  >
    Times for individual raw materials.<tspan x="10%" dy="1.2em"> Default = total inbound lead times;</tspan> <tspan x="10%" dy="1.2em">click pie slice to show resp. times</tspan>
    </text>
  </svg>

  <svg class = "color-legend" width="150" height="100">
    <rect width="15" height="15" x="10" y="10" rx="4" ry="4"  fill="#f6af36" />
    <text class = "legend" x="30" y="21"> Production times </text>
    <rect width="15" height="15" x="10" y="30" rx="4" ry="4"  fill="#ffd300" />
    <text class = "legend" x="30" y="41"> Transportation times </text>
    <rect width="15" height="15" x="10" y="50" rx="4" ry="4"  fill="#daa520" />
    <text class = "legend" x="30" y="61"> Goods receipt times </text>
  </svg>

  <svg class = "donut-legend" width = "150" height = "100">
    <circle
    class="donut"
    stroke-dasharray="70 30"
    r="14"
    cx="14"
    cy="14"></circle>
  </svg>

  <svg class = "donut-text" width="200" height="100">
    <text class = "legend" x="10%" y="50%"> % finished products received <tspan x="10%" dy="1.2em">before or on planned date </tspan></text>
  </svg>
  

<style>
    svg.pie {
        border-radius: 50%;
        background: #dedede;
        margin: 0;
        position: absolute;
        bottom: 5%;
        left: 10%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%) rotate(-90deg);
    }
    svg.pie-text {
        margin: 0;
        position: absolute;
        bottom: 5%;
        left: 11%;
    }
    svg.beams {
        border-radius: 50%;
        background: none;
        margin: 0;
        position: absolute;
        bottom: 5%;
        left: 28%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%) rotate(-90deg);
    }
    svg.beams-text {
        margin: 0;
        position: absolute;
        bottom: 5%;
        left: 28%;
    }
    text.legend {
        font-family: Arial;
        font-size: 12px;
        fill: #c8c8c8;
    }
    svg.color-legend {
        margin: 0;
        position: absolute;
        bottom: 3%;
        left: 47%;
    }
    svg.donut-legend {
        margin: 0;
        position: absolute;
        bottom: 3%;
        left: 57%;
    }
    circle.donut {
        fill: #ffffff;
        stroke: #c8c8c8;
        stroke-width: 2;
        transform: translate(50%, 50%) rotate(-90deg)
    }
    svg.donut-text {
        margin: 0;
        position: absolute;
        bottom: 5%;
        left: 64%;
    }
    path {
    fill: none;
    stroke: #c8c8c8;
    stroke-width: 1px;
  }
</style>
