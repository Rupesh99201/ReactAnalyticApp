import { merge } from 'lodash';
import { Chart, defaults } from 'react-chartjs-2'

const customTooltips = tooltip => {
    // tooltip will be false if tooltip is not visible or should be hidden
    if (!tooltip) { return }
  
    // Otherwise, tooltip will be an object with all tooltip properties like:
    tooltip.backgroundColor = '#FFF'
    tooltip.mode = 'index'
    tooltip.intersect = true
    tooltip.yPadding = 10
    tooltip.xPadding = 10
    tooltip.caretSize = 4
    tooltip.bodyFontColor = '#5A5A5A'
    tooltip.borderColor = '#CECED0'
    tooltip.borderWidth = 0.05
    tooltip.cornerRadius = 0
    tooltip.displayColors = false
  
    // Tooltip Element
    let tooltipEl = document.getElementById('chartjs-tooltip')
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div')
      tooltipEl.id = 'chartjs-tooltip'
      tooltipEl.innerHTML = '<table></table>'
      document.body.appendChild(tooltipEl)
    }
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0
      return
    }
    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform')
    if (tooltip.yAlign) {
      tooltipEl.classList.add(tooltip.yAlign)
    } else {
      tooltipEl.classList.add('no-transform')
    }
    const getBody = bodyItem => (bodyItem.lines)
  
    // Set custom tooltip
    if (tooltip.body) {
      const titleLines = tooltip.title || []
      const bodyLines = tooltip.body.map(getBody)
      const tooltipData = bodyLines[0][0]
  
      // Custom tooltip requires an id for proper positioning
      if (!tooltipData.id) { return }
  
      // Create inner html
      let innerHtml = '<thead>'
      const picture = tooltipData.pictureUrl
      const tooltipTitle = `<td class="tooltip-title">${tooltipData.label ? tooltipData.label : titleLines[0]}</td>`
      const tooltipValue = `<td class="tooltip-value">${tooltipData.value}${tooltipData.percent ? '%' : ''}</td>`
      if (picture) {
        innerHtml += `<tr><th colspan="2"><img class='tooltip-img img-responsive' src="${picture}" /></th></tr>`
        innerHtml += '</thead><tbody><tr>'
        innerHtml += tooltipValue + tooltipTitle
      } else {
        innerHtml += tooltipTitle
        innerHtml += '</thead><tbody><tr>'
        innerHtml += tooltipValue
      }
      innerHtml += '</tr></tbody>'
  
      // Set inner html to tooltip
      const tableRoot = tooltipEl.querySelector('table')
      tableRoot.innerHTML = innerHtml
      const chartElement = document.getElementById(tooltipData.id).getBoundingClientRect()
      // Calculate position
      const positionY = chartElement.top + tooltip.yPadding
      const positionX = chartElement.left + tooltip.xPadding
      // Display, position, and set styles for font
      tooltipEl.style.opacity = 1
      tooltipEl.style.left = positionX + tooltip.caretX + 'px'
      tooltipEl.style.top = positionY + tooltip.caretY + 'px'
    }
  
  }
  
  // Make chartjs use the custom tooltip
  merge(defaults, {
    global: {
      tooltips: {
        enabled: false,
        custom: customTooltips,
        callbacks: {
          label: (tooltipItem, data) => {
            const index = tooltipItem.datasetIndex === undefined ? tooltipItem.index : tooltipItem.datasetIndex
            const itemData = data.datasets[index]
            // Return custom data to tooltip, these will be available inside the tooltip.body
            return { id: data.id, pictureUrl: itemData.pictureUrl, label: itemData.label, value: tooltipItem.yLabel, xLabel: tooltipItem.xLabel, percent: data.percent }
          }
        }
      }
    }
  });
  