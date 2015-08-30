var backend = new MensaBackend;

/* At startup */
$(init);

/* Init function */
function init() {

  $(window).resize(doWindowResize);
  populateWelcome();
  enableEditable();

}

/********** populate gui ***********/
function populateWelcome() {

  backend.getText("welcome", "sv", callback);

  function callback(text) {
    $("#main_content").attr("what", "welcome").html(text);
  }

}

function enableEditable() {

  $(".btnEdit").click(doEditClick);

  tinyMCE.init({
    mode : "none",
    auto_focus : false
});

}

function doEditClick() {

  var id = $(this).attr("what");
  var textId = $('#'+id).attr("what");
  tinyMCE.execCommand('mceToggleEditor', false, id);

  var action = $(this).html();
  switch (action) {
    case "edit":
      $(".btnEdit").hide();
      $(this).html("save").show();
      break;
    case "save":
      var editor = tinymce.get(id);
      var text = editor.getContent();
      backend.setText(textId, "sv", text);
      $(this).html("edit");
      $(".btnEdit").show();
      break;
    default:
      alert("Oops!");
  }

}


/********** action function ***********/
function doShowCreateNewKit() {

  var html="<fieldset> \
    <legend>Create new kit</legend> \
    <div class='line'> \
      <label for='cboLanguage'>Language:</label> \
      <select id='cboLanguage'> \
<option value='-1'>&nbsp;</option> \
<option value='10114'>English</option> \
<option value='10118'>French</option> \
<option value='10116'>German</option> \
<option value='10109'>Swedish</option> \
      </select> \
    </div><br> \
    <div class='line'> \
      <label for='productlineModels'>Product Line / Model:</label> \
      <div id='productlineModels' class='blob'></div> \
    </div> \
    <div class='line'> \
      <label for='releaseDate'>Release date:</label> \
      <input id='releaseDate' type='text'> \
    </div> \
    <div class='line'> \
      <label for='note'>Note:</label><br> \
      <div class='blob'><textarea id='note' rows='5'></textarea></div> \
    </div> \
    <div id='btnCreate' class='button'>Create kit</div> \
    <div id='lblMessage' ></div> \
  </fieldset>";
  $('#popupContent').html(html);
  $('#releaseDate').datepicker({
      showWeek: true,
      firstDay: 1,
      dateFormat: "yy-mm-dd"
    });
  $('#btnCreate').click(doCreateNewKit);

  var html = "<div id='plms_tree'><ul>";
  var plms = backend.getProductlineModels();
  for (var pl in plms){
    html += "<li>"+pl+"<ul>";
    var models = plms[pl];
    for (var i = 0; i< models.length; i++){
      var model = models[i];
      html += "<li>"+model+"</li>";
    }
    html += "</ul></li>";
  }
  html += "</ul></div>";
  $('#productlineModels').html(html);
  $('#plms_tree')
    .on("changed.jstree", function (e, data) {
      var i, j;
      selectedModels.length = 0;
      for (i = 0, j = data.selected.length; i < j; i++) {
        selectedModels.push(data.instance.get_node(data.selected[i]).text);
      }
    })
  .jstree({"plugins" : [ "wholerow", "checkbox" ]});

  // Triggering bPopup
  $('#kitWizardPopup').bPopup({
      modalColor: 'silver',
      modalClose: false,
      escClose: false
  });

}

function doCreateNewKit() {

  var asset = {};

  asset["language"] = $('#cboLanguage').val();
  asset["models"] = selectedModels;
  asset["releaseDate"] = $('#releaseDate').val();
  asset["note"] = $('#note').val();

  var message = "";
  if (asset["language"]==='-1') {
    message+="Select a language.<br>";
  }
  if (selectedModels.length===0) {
    message+="Select at least one model.<br>";
  }
  if (asset["releaseDate"].length===0) {
    message+="Enter a release date.<br>";
  }
  if (message.length>0) {
    $('#lblMessage').html(message).show().delay(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    return;
  }

  asset = backend.createKit(asset);
  $('#mykits_list').prepend(getKitHtml(asset));
  $('.kit').click(doSelectKit);
  $('#'+asset['id']).click();

  $('#kitWizardPopup').bPopup().close();

}

function doShowAddExistingKit() {
  alert("doAddExistingKit");
}

function doSelectKit() {
  var kitId = $(this).attr('id');
  if (kitId !== selectedKitId) {
    $(this).addClass('selected');
    $('#'+selectedKitId).removeClass('selected');
    selectedKitId = kitId;
    resetKitChapterHeights();
    setTimeout(showKitMain, 10);
  }

}

function doAddToChapter() {
  var chapter = $(this).attr('id').replace('btnAddToChapter_', '');
  var asset = backend.createSection(~~selectedKitId, chapter);
  //alert(JSON.stringify(asset, null, 4));
  showKitMain();
}

function doWindowResize() {
  var w = $(this).width();
  /*
  var kitComponents = $('#kit_components');
  if (kitComponents.length) {
    var kcw = w-168;
    $('#kit_components').width(kcw);
    var titlew = (kcw - 150)/2;
    if (titlew<100) titlew=100;
    $('.kc_title').width(titlew);
    $('.kc_subtitle').width(titlew);
  }
  */

}

/********** layout function **********/
function getKitHtml(asset) {

  var html = "<div class='kit' id='"+asset.id+"'><div class='kit_image'></div><div class='kit_meta'>"+asset.pubId+"&nbsp;"+asset.edition+"</div></div>";
  return html;

}

function showKitMain() {

  var html = "<div id='kit_main'> \
  <div id='kit_chapters'>&nbsp;Chapters</div> \
  <div id='kit_components'><div>Components</div></div> \
  <div id='kit_binders'>&nbsp;Binders</div> \
  </div>";
  html = html.replace("#assetId#", selectedKitId);
  $('#kitdata').html(html);

  /** populate chapters **/
  for (var i = 0; i< chapters.length; i++){
      var c=chapters[i];
      html = "<div class='kit_chapter' id='kit_chapter_"+c+"' style='height:"+kitChapterHeights[c]+"px;'>&nbsp;&nbsp;"+c+"<div class='btnAddToChapter' id='btnAddToChapter_"+c+"' title='Add section'></div></div>";
      $('#kit_chapters').append(html);
  }
  $('.kit_chapter').hover(showAddToChapterButton, hideAddToChapterButton);
  $('.btnAddToChapter').click(doAddToChapter);

  /** populate components and updates the chapters and binders bar **/
  var assets = backend.getKitAssets(selectedKitId);
  var data = {};
  var binderIds = [];
  for (var i = 0; i< assets.length; i++){
      var asset=assets[i];
      var chapter = asset["chapter"];
      var chapterIndex = asset["chapterIndex"];
      var subdata = data[chapter];
      if (subdata===undefined) {
        subdata = [];
        data[chapter]=subdata;
      }
      subdata[chapterIndex]=asset;
  }

  var rowId = 0;
  for (var i = 0; i< chapters.length; i++){

      var c=chapters[i];
      var assets = data[c];

      if (assets!==undefined) {

        /* Update the length of the chapter bar */
        var h = (assets.length*27)-6;
        kitChapterHeights[c] = h;
        $('#kit_chapter_'+c).animate({height:h+"px"},250);

        /* populate the row */
        for (var chapIndex = 0; chapIndex< assets.length; chapIndex++){
          var asset = assets[chapIndex];
          $('#kit_components').append(getKitComponentHtmlRow(rowId++, asset));
          binderIds[binderIds.length]=asset["binderId"];
        }

        /* gather info for the binder bar */

      } else {
         /* Just add an empty row */
         $('#kit_components').append(getKitComponentHtmlRow(rowId++));
         binderIds[binderIds.length]=0;
      }

  }


  /** populate binders **/
  var lastBinderId = binderIds[0];
  var binderCount = 1;
  for (var i = 1; i< binderIds.length; i++){
    var binderId = binderIds[i];
    if (binderId!==0 && lastBinderId!==binderId) {
      html = "<div class='kit_binder' id='kit_binder_"+lastBinderId+"'>"+lastBinderId+"</div>";
      $('#kit_binders').append(html);
      var h = (binderCount*27)-6;
      $('#kit_binder_'+lastBinderId).animate({height:h+"px"},250);

      /* do a async call to populate binder info:  */

      lastBinderId=binderId;
      binderCount=1;
    } else {
      binderCount++;
    }
  }
  if (lastBinderId!==0) {
    html = "<div class='kit_binder' id='kit_binder_"+lastBinderId+"'>"+lastBinderId+"</div>";
    $('#kit_binders').append(html);
    var h = (binderCount*27)-6;
    $('#kit_binder_'+lastBinderId).animate({height:h+"px"},250);
  }

  enableSubTitleEdit();
  doWindowResize();

}

function showAddToChapterButton() {

  var id = $(this).attr('id').replace('kit_chapter_', '');
  $('#btnAddToChapter_'+id).fadeIn();

}

function hideAddToChapterButton() {

  var id = $(this).attr('id').replace('kit_chapter_', '');
  $('#btnAddToChapter_'+id).fadeOut();

}

function getKitComponentHtmlRow(rowId, asset) {

  if (asset===undefined) {
    return "<div id='kit_component_0' class='kit_component "+((rowId % 2 == 0) ? "evenRow" : "oddRow")+"'>";
  }

  var html = "<div id='kit_component_#assetId#' class='kit_component "+((rowId % 2 == 0) ? "evenRow" : "oddRow")+"'> \
  <div class='kc_pubId'>#pubId#&nbsp;#edition#</div> \
  <div class='kc_title'>#title#</div> \
  <div id='lbl_"+asset["id"]+"' class='kc_subtitle'>#subtitle#</div> \
  <div class='kc_pages'>#pages#</div> \
  </div>";

  html = html.replace("#assetId#", asset["id"]);
  html = html.replace("#pubId#", asset["pubId"]);
  html = html.replace("#edition#", asset["edition"]);
  html = html.replace("#title#", backend.getAssetTitle(asset));
  html = html.replace("#subtitle#", backend.getAssetSubtitle(asset));
  html = html.replace("#pages#", asset["pages"]);
  return html;
}


function enableSubTitleEdit() {

  $(".kc_subtitle").each(function () {

        var prefixLen = 14;
        var label = $(this);
        var prefix = label.html().substring(0, prefixLen);

        //Add a TextBox next to the Label.
        label.after("<input type = 'text' class='kc_subtitle' style = 'display:none' />");

        var textbox = $(this).next();
        var id = this.id.replace("lbl", "txt");
        textbox.attr('id', id);

        //When Label is clicked, hide Label and show TextBox.
        label.click(function () {
            $(this).hide();
            $(this).next().val($(this).html().substring(prefixLen)).show().focus();
        });

        //When focus is lost from TextBox, hide TextBox and show Label.
        textbox.focusout(function () {
            var text = prefix+$(this).val();
            $(this).hide();
            $(this).prev().html(text);
            $(this).prev().show();
            backend.setAssetSubtitle(~~id.replace("txt_",""), text);
        });

        textbox.keyup(function(e) {
          if (e.keyCode == 13 || e.keyCode == 27) $(this).focusout();
        });
    });

}

function resetKitChapterHeights() {
  for (var i = 0; i< chapters.length; i++){
    kitChapterHeights[chapters[i]]=21;
  }
}
