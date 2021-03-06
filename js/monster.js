try {
  $.getJSON("https://sharksnack.github.io/shiren2/json/monsters.json", function(data) {
    // load Monster Detail section HTML
    document.getElementById("monster_details").innerHTML = monster_details(data);
  });
} catch(e) {
  console.log(e);
}

$(document).ready(function() {
  // load some common HTML
    $("#sidebar").load("../../html/sidebar.html", function() {
      console.log('info - loaded sidebar');
    });
  } catch(e) {
    console.log('error: ' + e);
  }
});

// generate monster details HTML from monsters.json
function monster_details (data) {
  let html = [];
  let monster = {};
  let types = ["Normal", "Weapon", "Throwing", "Magic", "Item Change", "Stealing", "Dragon", "Ghost", "Drain", "One-eyed", "Bomb", "Water", "Oni", "Other"];

  // section heading
  html.push(`<h2>Monster Details</h2>`);

  // loop through monsters based on monster type
  for (let i = 0; i < types.length; i++) {
    html.push(`<h2 id="${types[i].toLowerCase()}">${types[i]}</h2>`);

    for (let n = 0; n < data.monsters.length; n++) {
      monster_family = data.monsters[n];

      // display monster entries by monster family
      if (monster_family.type === types[i]) {
        html.push(`<h3 id="${monster_family.family_id}">${monster_family.family_name}  (${monster_family.family_name_jp})</h3>`);

        // monster family images
        html.push(`<div class="monster_images">`);
        for (let m = 0; m < monster_family.images.length; m++) {
          html.push(`<img src="../../image/monster/${monster_family.images[m].filename}" width="${monster_family.images[m].width}" height="${monster_family.images[m].height}">`);
        }
        html.push(`</div>`);

        // monster family description
        html.push(`<div class="family_desc">
          ${monster_family.family_desc_en}
        </div>`);

        // monster details table header
        html.push(`
          <table>
            <tr>
              <th>Name</th>
              <th>HP</th>
              <th>ATK</th>
              <th>DEF</th>
              <th>EXP</th>
              <th>Element</th>
              <th>Sleep</th>
              <th>Wake</th>
              <th>Drop</th>
              <th>Item</th>
              <th>Sp</th>
              <th>Notes</th>
            </tr>`);

        // family can have 1~4 entries, so loop through them for filling out rows
        for (let m = 0; m < monster_family.entries.length; m++) {
          let monster = monster_family.entries[m];
          html.push(`
            <tr>
              <td style="white-space:nowrap;">${monster.name_en}</td>
              <td>${monster.stats.hp}</td>
              <td>${monster.stats.attack}</td>
              <td>${monster.stats.defense}</td>
              <td>${monster.stats.experience}</td>
              <td>${monster.element.join('<br>') || '-'}</td>
              <td>${monster.sleep_rate || '-'}</td>
              <td style="white-space:nowrap;">${monster.wake_condition || '-'}</td>
              <td>${monster.item_drop_rate}</td>
              <td>${monster.item_drop || '-'}</td>
              <td>${monster.special_attack_rate || '-'}</td>
              <td>${monster.notes.join('<br>')}</td>
            </tr>
          `);
        }
        html.push(`</table>`);

        // monster as ally section (Oni and Other types cannot be allies)
        if (monster_family.type !== "Oni" && monster_family.type !== "Other") {

          // monster as ally description
          html.push(`<h5>Ally / Possession Staff:</h5>`);
          if (monster_family.ally_desc_en !== "") {
            html.push(`<div class="ally_desc">${monster_family.ally_desc_en}</div>`);
          }
          html.push(`
            <table>
              <tr>
                <th>Name</th>
                <th>Max Lv</th>
                <th>HP+</th>
                <th>ATK+</th>
                <th>Max HP</th>
                <th>Max ATK</th>
                <th>Notes</th>
              </tr>`);
          // family can have 1~4 entries, so loop through them for filling out rows
          for (let m = 0; m < monster_family.entries.length; m++) {
            let monster = monster_family.entries[m];
            html.push(`
              <tr>
                <td style="white-space:nowrap;">${monster.name_en}</td>
                <td>${monster.ally_stats.max_growth}</td>
                <td>${monster.ally_stats.hp_increase}</td>
                <td>${monster.ally_stats.attack_increase}</td>
                <td>${monster.ally_stats.max_hp}</td>
                <td>${monster.ally_stats.max_attack}</td>
                <td>${monster.notes_ally.join('<br>')}</td>
              </tr>
            `);
          }
          html.push(`</table>`);
        }
      }
    }
  }

  return html.join('\n');
}
