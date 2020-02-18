try {
  $.getJSON("https://sharksnack.github.io/shiren2/json/items.json", function(data) {

    // Check filename to determine item category (ex: html/item/shields.html -> shield)
    var regex = /\w+(?=\.html)/;
    var category = window.location.pathname.match(regex)[0];

    // load page HTML (2 sections - summary and details)
    document.getElementById("item_summary_table").innerHTML = item_summary_table(data, category);
    if (category !== 'decoration') {
      document.getElementById("item_details").innerHTML = item_details(data, category);
    } 
  });
} catch(e) {
  console.log(e);
}

$(document).ready(function() {
  // load some common HTML
  try {
    $("#sidebar").load("../../html/sidebar.html", function() {
      console.log('info - loaded sidebar');
    });
    $("#footer").load("../../html/footer.html", function() {
      console.log('info - loaded footer');
    });
  } catch(e) {
    console.log('error: ' + e);
  }
});

// Item Summary Table HTML
function item_summary_table (data, category) {
  let caption = category[0].toUpperCase() +  category.slice(1);
  let html = [];
  let item = {};

  // category-specific variables
  let equipment_stat_label = category === 'weapon' ? 'Atk' : 'Def';
  let price_buy = 0;
  let price_sell = 0;
  let projectile_power = 0;

  // headers by category
  let th_weapon_shield = ['Name', 'Seal', equipment_stat_label, 'Slots', 'Buy', 'Sell', 'Phrase', 'Info'];
  let th_bracelet_food_grass_scroll = ['Name', 'Seal', 'Buy', 'Sell', 'Phrase', 'Info'];
  let th_projectile = ['Name', 'Power', 'Seal', 'Buy', 'Sell', 'Phrase', 'Info'];
  let th_staff_pot = ['Name', 'Buy', '+1', 'Sell', '+1', 'Phrase', 'Info'];
  let th_material_other = ['Name', 'Buy', 'Sell', 'Phrase', 'Info'];
  let th_decoration = ['Name', 'Location', 'Info'];

  html.push(`<h2 class="page_heading">${caption} Summary</h2>`);

  // summary table header row
  html.push(`<table>
          <thead>
          <tr>`);
  switch (category) {
    case 'weapon':
    case 'shield':
      for (let i = 0; i < th_weapon_shield.length; i++) {
        html.push(`<th scope="col">${th_weapon_shield[i]}</th>`);
      }
      break;
    case 'bracelet':
    case 'food':
    case 'grass':
    case 'scroll':
      for (let i = 0; i < th_bracelet_food_grass_scroll.length; i++) {
        html.push(`<th scope="col">${th_bracelet_food_grass_scroll[i]}</th>`);
      }
      break;
    case 'staff':
    case 'pot':
      for (let i = 0; i < th_staff_pot.length; i++) {
        html.push(`<th scope="col">${th_staff_pot[i]}</th>`);
      }
      break;
    case 'projectile':
      for (let i = 0; i < th_projectile.length; i++) {
        html.push(`<th scope="col">${th_projectile[i]}</th>`);
      }
      break;
    case 'material':
    case 'other':
      for (let i = 0; i < th_material_other.length; i++) {
        html.push(`<th scope="col">${th_material_other[i]}</th>`);
      }
      break;
    case 'decoration':
      for (let i = 0; i < th_decoration.length; i++) {
        html.push(`<th scope="col">${th_decoration[i]}</th>`);
      }
      break;
    default:
      // do nothing
  }
  html.push(`</tr>
           </thead>
           <tbody>`);

  // summary table item rows
  for (let i = 0; i < data[category].length; i++) {
    item = data[category][i];

    // generate the row by category
    switch (category) {
      case 'weapon':
      case 'shield':
        html.push(`<tr>
                 <td scope="row" data-label="Name"><a href="${'#' + item.id}">${item.name_en}</a></td>
                 <td data-label="Seal">${item.seal || '-'}</td>
                 <td data-label="${equipment_stat_label}">${item.base_stat}</td>
                 <td data-label="Slots">${item.slots}</td>
                 <td data-label="Buy">${item.price_buy}</td>
                 <td data-label="Sell">${item.price_sell}</td>
                 <td data-label="Phrase" class="summary_phrase">${item.phrase || '-'}</td>
                 <td data-label="Info">${item.desc_short_en || '-'}</td>
                 </tr>`);
        break;
      case 'bracelet':
      case 'food':
      case 'grass':
      case 'scroll':
        html.push(`<tr>
                 <td scope="row" data-label="Name"><a href="${'#' + item.id}">${item.name_en}</a></td>
                 <td data-label="Seal">${item.seal || '-'}</td>
                 <td data-label="Buy">${item.price_buy}</td>
                 <td data-label="Sell">${item.price_sell}</td>
                 <td data-label="Phrase" class="summary_phrase">${item.phrase || '-'}</td>
                 <td data-label="Info">${item.desc_short_en || '-'}</td>
                 </tr>`);
        break;
      case 'staff':
      case 'pot':
        // only show the base price in the summary to prevent clutter
        price_buy = item.price_buy[0];
        price_sell = item.price_sell[0];
        html.push(`<tr>
                 <td scope="row" data-label="Name"><a href="${'#' + item.id}">${item.name_en}</a></td>
                 <td data-label="Buy">${price_buy}</td>
                 <td data-label="+1">${item.price_use_buy || '-'}</td>
                 <td data-label="Sell">${price_sell}</td>
                 <td data-label="+1">${item.price_use_sell || '-'}</td>
                 <td data-label="Phrase" class="summary_phrase">${item.phrase || '-'}</td>
                 <td data-label="Info">${item.desc_short_en || '-'}</td>
                 </tr>`);
        break;
      case 'projectile':
        // be sure to display the value 0 instead of -
        projectile_power = item.base_stat === '' ? '-' : item.base_stat;
        html.push(`<tr>
                 <td scope="row" data-label="Name"><a href="${'#' + item.id}">${item.name_en}</a></td>
                 <td data-label="Power">${projectile_power}</td>
                 <td data-label="Seal">${item.seal || '-'}</td>
                 <td data-label="Buy">${item.price_buy}</td>
                 <td data-label="Sell">${item.price_sell}</td>
                 <td data-label="Phrase" class="summary_phrase">${item.phrase || '-'}</td>
                 <td data-label="Info">${item.desc_short_en || '-'}</td>
                 </tr>`);
        break;
      case 'material':
      case 'other':
        html.push(`<tr>
                 <td scope="row" data-label="Name"><a href="${'#' + item.id}">${item.name_en}</a></td>
                 <td data-label="Buy">${item.price_buy || '-'}</td>
                 <td data-label="Sell">${item.price_sell || '-'}</td>
                 <td data-label="Phrase" class="summary_phrase">${item.phrase || '-'}</td>
                 <td data-label="Info">${item.desc_short_en || '-'}</td>
                 </tr>`);
        break;
      case 'decoration':
        html.push(`<tr>
                 <td scope="row" data-label="Name">${item.name_en}</a></td>
                 <td data-label="Seal">${item.locations[0] || '-'}</td>
                 <td data-label="Info">${item.desc_short_en || '-'}</td>
                 </tr>`);
        break;
      default:
        // do nothing
    }
  }
  html.push(`</tbody>
        </table>`);

  return html.join('\n');
}

function item_details (data, category) {
  let heading = category[0].toUpperCase() + category.slice(1);
  let html = [];
  let item = {};

  // category-specific variables
  let equipment_stat_label = (category === 'weapon') ? 'Atk' : 'Def';
  let projectile_power = '';

  // section heading
  html.push(`<h2>${heading} Details</h2>`);

  // item entries
  for (let i = 0; i < data[category].length; i++) {
    item = data[category][i];

    // generate the HTML by category
    switch (category) {
      case 'weapon':
      case 'shield':
        html.push(`<div>
                 <h3 id="${item.id}">${item.name_en} (${item.name_jp})</h3>
                 <div class="detail-entry">
                 <div class="detail-section1">
                 <p class="item_desc">${item.desc_en}</p>
                 <img src="../../image/${category}/${item.image.filename}" width="${item.image.width}" height="${item.image.height}">`);
        html.push(`<p>Locations:</p>`);
        html.push( locations_list(item) );
        html.push(`</div>
                 <table class="detail-table">
                 <tr>
                 <th>${equipment_stat_label}</th>
                 <td>${item.base_stat}</td>
                 <th>Slots</th>
                 <td>${item.slots}</td>
                 </tr>
                 <tr>
                 <th>Buy</th>
                 <td>${item.price_buy}</td>
                 <th>Sell</th>
                 <td>${item.price_sell}</td>
                 </tr>
                 <tr>
                 <th>+1</th>
                 <td>${item.price_plus}</td>
                 <th>Stack</th>
                 <td>${item.stack || '-'}</td>
                 </tr>
                 <tr>
                 <th>Seal</th>
                 <td>${item.seal || '-'}</td>
                 <th>Phrase</th>
                 <td>${item.phrase || '-'}</td>
                 </tr>
                 </table>`);
        html.push( seal_stacking_table(item, category) );
        html.push(`</div>
                 </div>`);
        break;
      case 'bracelet':
      case 'food':
      case 'grass':
      case 'scroll':
        html.push(`<div>
                 <h3 id="${item.id}">${item.name_en} (${item.name_jp})</h3>
                 <div class="detail-entry">
                 <div class="detail-section1">
                 <p class="item_desc">${item.desc_en}</p>`);
        html.push(`<p>Locations:</p>`);
        html.push( locations_list(item) );
        html.push(`</div>
                 <table class="detail-table">
                 <tr>
                 <th>Buy</th>
                 <td>${item.price_buy}</td>
                 <th>Sell</th>
                 <td>${item.price_sell}</td>
                 </tr>
                 <tr>
                 <th>Seal</th>
                 <td>${item.seal || '-'}</td>
                 <th>Stack</th>
                 <td>${item.stack || '-'}</td>
                 </tr>
                 <tr>
                 <th>Phrase</th>
                 <td colspan="3">${item.phrase || '-'}</td>
                 </tr>
                 </table>`);
        html.push( seal_stacking_table(item, category) );
        html.push(`</div>
                 </div>`);
        break;
      case 'staff':
      case 'pot':
        html.push(`<div>
                 <h3 id="${item.id}">${item.name_en} (${item.name_jp})</h3>
                 <div class="detail-entry">
                 <div class="detail-section1">
                 <p class="item_desc">${item.desc_en}</p>`);
        html.push(`<p>Locations:</p>`);
        html.push( locations_list(item) );
        html.push(`</div>
                 <table class="detail-table">
                 <tr>
                 <th>Phrase</th>
                 <td colspan="3">${item.phrase || '-'}</td>
                 </tr>
                 </table>`);
        html.push( staff_pot_price_table(item, category) );
        html.push(`</div>
                 </div>`);
        break;
      case 'projectile':
        projectile_power = item.base_stat === '' ? '-' : item.base_stat;
        html.push(`<div>
                 <h3 id="${item.id}">${item.name_en} (${item.name_jp})</h3>
                 <div class="detail-entry">
                 <div class="detail-section1">
                 <p class="item_desc">${item.desc_en}</p>`);
        html.push(`<p>Locations:</p>`);
        html.push( locations_list(item) );
        html.push(`</div>
                 <table class="detail-table">
                 <tr>
                 <th>Power</th>
                 <td>${projectile_power}</td>
                 <th>Phrase</th>
                 <td>${item.phrase || '-'}</td>
                 </tr>
                 <tr>
                 <tr>
                 <th>Buy</th>
                 <td>${item.price_buy}</td>
                 <th>Sell</th>
                 <td>${item.price_sell}</td>
                 </tr>
                 <th>Seal</th>
                 <td>${item.seal || '-'}</td>
                 <th>Stack</th>
                 <td>${item.stack || '-'}</td>
                 </tr>
                 </table>
                 </div>
                 </div>`);
        break;
      case 'material':
      case 'other':
        html.push(`<div>
                 <h3 id="${item.id}">${item.name_en} (${item.name_jp})</h3>
                 <div class="detail-entry">
                 <div class="detail-section1">
                 <p class="item_desc">${item.desc_en}</p>`);
        html.push(`<p>Locations:</p>`);
        html.push( locations_list(item) );
        html.push(`</div>
                 <table class="detail-table">
                 <tr>
                 <th>Buy</th>
                 <td>${item.price_buy || '-'}</td>
                 <th>Sell</th>
                 <td>${item.price_sell || '-'}</td>
                 </tr>
                 <tr>
                 <th>Phrase</th>
                 <td colspan="3">${item.phrase || '-'}</td>
                 </tr>
                 </table>
                 </div>
                 </div>`);
        html.push(`</div>
                 </div>`);
        break;
      default:
        // do nothing
    }
  }
  html.push("</div>");

  return html.join('\n');
}

// Generate the price table HTML (for staff and pot categories)
function staff_pot_price_table (item, category) {
  let html = [];
  let cost_label = (category === 'staff') ? 'Uses' : 'Size';
  let price_array_length = (category === 'staff') ? 8 : 7;

  // header row
  html.push(`<div class="detail-section2">
          <table class="detail-table section2-table">
          <thead>
          <tr>
          <th>${cost_label}</th>
          <th>+1</th>
          <th>0</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>`);
  if (category === 'staff') {
    html.push('<th>7</th>'); // staves have 7 uses while pots only go up to 6
  }
  html.push(`</tr>
           </thead>
           <tbody>`);

  // buy row
  html.push(`<tr>
           <td>Buy</td>
           <td>${item.price_use_buy}</td>`);
  for (let i = 0; i < price_array_length; i++) {
    html.push(`<td>${item.price_buy[i] || '-'}</td>`);
  }
  html.push(`</tr>`);

  // sell row
  html.push(`<tr>
           <td>Sell</td>
           <td>${item.price_use_sell}</td>`);
  for (let i = 0; i < price_array_length; i++) {
    html.push(`<td>${item.price_sell[i] || '-'}</td>`);
  }
  html.push(`</tr>
           </tbody>
           </table>
           </div>`);

  return html.join('\n');
}

// Generate the Seal Stacking table HTML
function seal_stacking_table (item, category) {
  let html = [];

  if (item.stack === 'Yes') {
    html.push(`<div class="detail-section2">
             <table class="detail-table section2-table">
             <thead>
              <tr>
                <th>Seals</th>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
              </tr>
              <tr>
                <th></th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
                <th>16</th>
                <th>17</th>
              </tr>
             </thead>
             <tbody>
               <tr>
                 <td>${item.stack_label}</td>
                 <td></td>
                 <td>${item.stack_multiplier[0]}</td>
                 <td>${item.stack_multiplier[1]}</td>
                 <td>${item.stack_multiplier[2]}</td>
                 <td>${item.stack_multiplier[3]}</td>
                 <td>${item.stack_multiplier[4]}</td>
                 <td>${item.stack_multiplier[5]}</td>
                 <td>${item.stack_multiplier[6]}</td>
                 <td>${item.stack_multiplier[7]}</td>
               </tr>
               <tr>
                 <td></td>
                 <td>${item.stack_multiplier[8]}</td>
                 <td>${item.stack_multiplier[9]}</td>
                 <td>${item.stack_multiplier[10]}</td>
                 <td>${item.stack_multiplier[11]}</td>
                 <td>${item.stack_multiplier[12]}</td>
                 <td>${item.stack_multiplier[13]}</td>
                 <td>${item.stack_multiplier[14]}</td>
                 <td>${item.stack_multiplier[15]}</td>
                 <td>${item.stack_multiplier[16] || ''}</td>
               </tr>`);
    if (item.stack_label_2 !== undefined) {
      html.push(`<tr>
                 <td>${item.stack_label_2}</td>
                 <td></td>
                 <td>${item.stack_multiplier_2[0]}</td>
                 <td>${item.stack_multiplier_2[1]}</td>
                 <td>${item.stack_multiplier_2[2]}</td>
                 <td>${item.stack_multiplier_2[3]}</td>
                 <td>${item.stack_multiplier_2[4]}</td>
                 <td>${item.stack_multiplier_2[5]}</td>
                 <td>${item.stack_multiplier_2[6]}</td>
                 <td>${item.stack_multiplier_2[7]}</td>
               </tr>
               <tr>
                 <td></td>
                 <td>${item.stack_multiplier_2[8]}</td>
                 <td>${item.stack_multiplier_2[9]}</td>
                 <td>${item.stack_multiplier_2[10]}</td>
                 <td>${item.stack_multiplier_2[11]}</td>
                 <td>${item.stack_multiplier_2[12]}</td>
                 <td>${item.stack_multiplier_2[13]}</td>
                 <td>${item.stack_multiplier_2[14]}</td>
                 <td>${item.stack_multiplier_2[15]}</td>
                 <td>${item.stack_multiplier_2[16] || ''}</td>
               </tr>`);
    }
    html.push(`</tbody>
             </table>
             </div>`);
  }
  return html.join('\n');
}

function locations_list (item) {
  let html = [];

  html.push(`<ul>`);
  for (let i = 0; i < item.locations.length; i++) {
    html.push(`<li>${item.locations[i]}</li>`);
  }
  html.push(`</ul>`);

  return html.join('\n');
}
