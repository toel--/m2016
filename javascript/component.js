function getHtmlSelect(id, cssClass, values, selected, placeholder) {

  var html = "<select id='"+id+"' class='"+cssClass+"'>\n";
  if (placeholder!==undefined) html+="<option value='' disabled selected>"+placeholder+"</option>\n";

  if ($.isArray(values)) {
    for (var i = 0; i< values.length; i++){
      var tag = "";
      if (selected===values[i]) tag="selected";
      html += "<option "+tag+">"+values[i]+"</option>\n";
    }
  } else {
    for (var key in values) {
      var tag = "";
      if (selected===key) tag="selected";
      html += "<option value='"+key+"' "+tag+">"+values[key]+"</option>\n";
    }
  }
  html += "</select>\n";
  return html;

}

function getCheckBox(id, cssClass, value, checked, label) {
  var html = "<input type='checkbox' id='"+id+"' class='"+cssClass+"' value='"+value+"' "+(checked?"checked='checked'":"")+" /> \
<label for='"+id+"' class='"+cssClass+"'>"+label+"</label>";
  return html;
}
