var loaded_kjv = false;
var findbook = new Array();
var findchapter = new Array();
var showMatches   = 10000;
var currentMatch  = 0;
var currentHash = 0;
var customHistory = new Array();
var fontsize = 2;
var ver = getInternetExplorerVersion();

function getInternetExplorerVersion() {    
	var rv = -1; 
	// Return value assumes failure.    
	if (navigator.appName == 'Microsoft Internet Explorer') {        
		var ua = navigator.userAgent;        
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");        
		if (re.exec(ua) != null)            
			rv = parseFloat(RegExp.$1);    
	}    
	return rv;
}
	
function backContent(hashcode){
	if (customHistory[hashcode]) {
		$get('wrapper').innerHTML = customHistory[hashcode];
		currentHash--;
		if (currentHash < 0) currentHash = 0;
		resetPos();
	}
}

function showContent(content){
	currentHash++;
	customHistory[currentHash] = content;
	$get('wrapper').innerHTML = content;
	window.location.hash = currentHash;
	if ((ver > -1)&&(ver <= 7.0)) {
		/**
		* if IE is detected, rewrite the iframe contents. The
		* iframe body contains the hash (in this case a simple number)
		* and the iframe-scripting changes the documents location.hash
		* opening/writing the iframe document adds it to IE's history
		* If the user clicks back, the browser goes back to the
		* previous iframe, user stays on the containing page and
		* the checkHash function handles the hashchange.
		*/		
		frm.document.open();
		frm.document.write(frContentTemplate.replace(/_hashvalue_/gi,currentHash));
		frm.document.close();
	} else {
		/**
		* otherwise location.hash is just rewritten
		* (and handled by the monitoring function)
		*/
		window.location.href = window.location.href.split('#')[0] + '#' + currentHash;
	}
}

function checkHash(){
	setInterval(function(e)	{
		var gethash = document.location.hash;
		var pagehash;
		if (!gethash)	pagehash = 0;
			else pagehash = gethash.split('#')[1];
		if (pagehash == 0 && !customHistory[0]) customHistory[0] = $get('wrapper').innerHTML;
			else if (pagehash != currentHash) backContent(pagehash);
	}, 100);
}

function $get(stringId){
	return document.getElementById(stringId);
}

function onClickKJV() {
	if (!loaded_kjv && document.frmSearch.chkKJV.checked) {
		dvBdy = document.createElement("div");
		dvBdy.style.border='1px solid #C8BA92';
		dvBdy.style.fontFamily='Verdana';
		dvBdy.style.fontSize='12px';
		dvBdy.style.padding='2';
		dvBdy.style.background='#F3F0E7';
		dvBdy.style.position="absolute";
		dvBdy.style.top=(document.frmSearch.chkKJV.offsetTop+14)+"px";
		dvBdy.style.left=(document.frmSearch.chkKJV.offsetLeft+40)+"px";
		dvBdy.style.verticalAlign="middle";

		dvBdy.innerHTML="下載中，請耐心等候。";		
		document.getElementsByTagName("body")[0].appendChild(dvBdy);
		document.body.style.cursor = 'wait';
		setTimeout("loadKJV()", 100);
	}
}

function loadKJV() {
	var element = document.createElement("script");
	element.src = "./script/kjv.js";
	element.type="text/javascript";
	document.getElementsByTagName("head")[0].appendChild(element);
	setTimeout("checkKJV()", 100);
}

function checkKJV() {
	if (loaded_kjv) {
		dvBdy.style.visibility="hidden";
		document.body.style.cursor = 'default';
	} else {
		setTimeout("checkKJV()", 100);
	}
}

function restore(e) {
	for (var i = 0; i < e.options.length; i++) 
		if (e.options[i].selected && e.options[i].disabled) e.options[i].selected = false;
} 

function loadscope() {
	if (!loaded_kjv) {
		document.frmSearch.chkKJV.checked = false;
		document.frmSearch.compare.checked = false;
	}
	var frm = document.frmSearch;
	var item = new Option("========舊約========", "");
	item.style.backgroundColor="black";
	item.style.color="white";
	item.style.fontWeight="bold";
	item.disabled = true;
	frm.scopeList.options.add(item);
	for (var i = 0; i <= books.length-1; i++)
	{
		if (i == 39) {
			item = new Option("========新約========", "");
			item.style.backgroundColor="black";
			item.style.color="white";
			item.style.fontWeight="bold";
			item.disabled = true; 
			frm.scopeList.options.add(item);
		}
		item = new Option(books[i], i);
		if (i < 39) item.style.backgroundColor="#CFE6C8";
			else item.style.backgroundColor="#EEE4BF";
		frm.scopeList.options.add(item);
	}
}

function changeContent(sHTML, eid) { 
	if (eid=="wrapper") showContent(sHTML);
	 else $get(eid).innerHTML = sHTML; 	
} 

function setLeftNavHighlight(bnum) {
	for (var i=0; i<=books.length-1; i++){
		if (bnum==i) $get("leftnav_"+i).className = "currentpage"; 
			else $get("leftnav_"+i).className = ""; 
	}
}

function setPageSizeHighlight(bnum) {
	for (var i=1; i<=4; i++){
		if (bnum==i) $get("fontsize"+i).className = "currentpage"; 
			else $get("fontsize"+i).className = ""; 
	}
}

function writeLeftNav(bnum) {
	var sHTML = "";
	sHTML += "<h3 class='headerbar' onClick='showHideElement(\"divSubOT\");return false;'>";
	sHTML += "<table border=0 cellpadding=0 cellspacing=0><tr>";
	sHTML += "<td width=180>舊約聖經 Old Testament</td>";
	sHTML += "<td width=10 align=right><img src='image/collapse.gif' id='divSubOT_arrow'></td></table></h3>";
	sHTML += "<div id='divSubOT'><ul>";
	for (var i=0; i<39; i++){
		sHTML += "<li><a href='#' id='leftnav_"+i+"' onClick='readBible("+i+",0,1);return false;' OnMouseover='return true;'>"+books[i]+" "+books_kjv[i]+ "</a></li>";
	}
	sHTML += "</ul></div>";
	sHTML += "<h3 class='headerbar' style='margin-top:1px' onClick='showHideElement(\"divSubNT\");return false;'>";
	sHTML += "<table border=0 cellpadding=0 cellspacing=0><tr>";
	sHTML += "<td width=180>新約聖經 New Testament</td>";
	sHTML += "<td width=10 align=right><img src='image/collapse.gif' id='divSubNT_arrow'></td></table></h3>";
	sHTML += "<div id='divSubNT'><ul>";
	for (var i=39; i<=books.length-1; i++){
		sHTML += "<li><a href='#' id='leftnav_"+i+"' onClick='readBible("+i+",0,1);return false;' OnMouseover='return true;'>"+books[i]+((i==51||i==52)?"<BR>":" ")+books_kjv[i]+ "</a></li>";
	}
	sHTML += "</ul></div>";
	return sHTML;
}

function writeChapterNav(bnum, cnum) {
	sHTML = "";
	sHTML += '<div id="pagenav" style="overflow:hidden;">';
	sHTML += "<ul>";
	//previous book
	if (bnum!=0) {
		sHTML += "<li><a href='' onClick='readBible("+(bnum-1)+","+(book_chapters[bnum]-book_chapters[bnum-1]-1)+",1);return false;' OnMouseover='return true;'>«</a></li>";
	} else {
		sHTML += "<li class='dim'>«</li>";
	}
	//previous chapter
	if (cnum!=0) {
		sHTML += "<li><a href='' onClick='readBible("+bnum+","+(cnum-1)+",1);return false;' OnMouseover='return true;'>‹</a></li>";
	} else {
		sHTML += "<li class='dim'>‹</li>";
	}
	for (var i = 1; i <= book_chapters[bnum+1]-book_chapters[bnum]; i++) {	  			
		sHTML += "<li><a href='' onClick='readBible("+bnum+","+(i-1)+",1);return false;' OnMouseover='return true;'";
		if (cnum==(i-1)) sHTML += " class='currentpage'";
		sHTML += ">" + i +"</a></li>";
	}
	//next chapter
	if (cnum!=book_chapters[bnum+1] - book_chapters[bnum] - 1) {
		sHTML += "<li><a href='' onClick='readBible("+bnum+","+(cnum+1)+",1);return false;' OnMouseover='return true;'>›</a></li>";
	} else {
		sHTML += "<li class='dim'>›</li>";
	}
	//next book
	if (bnum!=65) {
		sHTML += "<li><a href='' onClick='readBible("+(bnum+1)+",0,1);return false;' OnMouseover='return true;'>»</a></li>";
	} else {
		sHTML += "<li class='dim'>»</li>";
	}
	sHTML += "</ul>";
	sHTML += "</div>";			
	return sHTML;							
}

function writeSetFontSize() {
	var sHTML = "";
	sHTML += "<div id='selectfontsize'>";
	sHTML += "<ul>";
	sHTML += "	<li class='fontsize1'><a href='javascript:void(0);' id='fontsize1' onclick='changeStyle(1);setPageSizeHighlight(1);' title='最小字型'"+(fontsize==1?" class='currentpage'":"")+">A</a></li>";
	sHTML += "	<li class='fontsize2'><a href='javascript:void(0);' id='fontsize2' onclick='changeStyle(2);setPageSizeHighlight(2);' title='適中字型'"+(fontsize==2?" class='currentpage'":"")+">A</a></li>";
	sHTML += "	<li class='fontsize3'><a href='javascript:void(0);' id='fontsize3' onclick='changeStyle(3);setPageSizeHighlight(3);' title='較大字型'"+(fontsize==3?" class='currentpage'":"")+">A</a></li>";
	sHTML += "	<li class='fontsize4'><a href='javascript:void(0);' id='fontsize4' onclick='changeStyle(4);setPageSizeHighlight(4);' title='最大字型'"+(fontsize==4?" class='currentpage'":"")+">A</a></li>";
	sHTML += "</ul>";
	sHTML += "</div>";
	return sHTML;
}

function writeMainPage() {
	var sHTML = '';
	return sHTML;
}

function writeRemark() {
	var sHTML = '';
	sHTML += "<div class='remark'><div style='float:left;margin-top:5px;'>註：「</div><div style='margin-top:5px;height:10px;width:20px;border-bottom:2px dotted;float:left;'> </div>";
	sHTML += "<div style='float:left;margin-top:5px;margin-left:2px;'>」顯示為對照《King James Version》被刪改的《和合本》經文，詳情請瀏覽網址：<a href=http://ckjv.asia>http://ckjv.asia</a></div>";
	sHTML += "<div style='float:right;margin-top:5px;margin-left:2px;'><a href='javascript:;' onclick='alert(\"[Shift] + [向上鍵↑]：往上一部書\\n[Shift] + [向下鍵↓]：往下一部書\\n[Shift] + [向左鍵←]：往上一章\\n[Shift] + [向右鍵→]：往下一章\")'>鍵盤快速鍵</a></div>";	
	return sHTML;
}

function writeChapter(bnum, cnum, hashcode) {	
	var frm = document.frmSearch;
	var kjv = frm.chkKJV.checked;
	var ckjv = frm.chkCKJV.checked;	
	if (!loaded_kjv && kjv) return;	
	var line1 = lines[book_chapters[bnum]+cnum];  
	var line2 = lines[book_chapters[bnum]+cnum+1];
	var sHTML = ""; 
	var j = 1;		
	sHTML += '<div id="scrollbody" heihgt="100%"><div id="scrollcontent" class="fontSize' + fontsize + '">';
	sHTML += writeSetFontSize();	
	if (ckjv || kjv) {
		sHTML += '<table class="maintable" width="98%">';
		sHTML += '<tr class="title">';
		if (ckjv) sHTML += '<td align="left"' + ((ckjv && kjv)?' width="50%" ':'') + 'colspan="2" nowrap>' + books[bnum] + ' 第' + (cnum+1) + '章</td>'; 
		if (kjv) sHTML += '<td align="left"' + ((ckjv && kjv)?' width="50%" ':'') + 'colspan="2" nowrap>' + books_kjv[bnum] + ' Chapter ' + (cnum+1) + '</td>';		
		sHTML += "</tr>";				
		for (var i = line1; i < line2; i++) {	
			if (ckjv) { 				
				var name_ckjv = profiles[i].substring(0,profiles[i].indexOf(" "));
				var bible_ckjv = highlight(profiles[i].substring(profiles[i].indexOf(" "), profiles[i].length));	
			} 
			if (kjv) { 
				var name_kjv = profiles_kjv[i].substring(0,profiles_kjv[i].indexOf(" "));
				var bible_kjv = highlight(profiles_kjv[i].substring(profiles_kjv[i].indexOf(" "), profiles_kjv[i].length));	
			}				
			sHTML += '<tr>'; 
			sHTML += '<td width="1%" class="vid"';
			if (hashcode==name_ckjv||hashcode==name_kjv) 
				sHTML += ' style="border-right:0px;border-left:2px;border-top:2px;border-bottom:2px;border-style:dashed;border-color:#789DB3;"';
			sHTML += '>'+j+'</td>'; 
			sHTML += '<td' + ((ckjv&&kjv)? ' width="49%" ' : ' width="99%" ');
			if (hashcode==name_ckjv||hashcode==name_kjv) 
				sHTML += ' style="border-right:'+((ckjv&&kjv)?'0':'2')+'px;border-left:0px;border-top:2px;border-bottom:2px;border-style:dashed;border-color:#789DB3;"';
			sHTML +='>'; 
			if (ckjv) { 				
				sHTML += '<a name="'+name_ckjv+'" id="'+name_ckjv+'"></a>' + bible_ckjv; 
			} else { 
				sHTML += '<a name="'+name_kjv+'" id="'+name_kjv+'"></a>' + bible_kjv; 
			}	
			sHTML += '</td>'; 
			if (ckjv&&kjv) {
				sHTML += '<td width="1%" class="vid" style="border-left:1px solid #C0C0C0;';
				if (hashcode==name_ckjv||hashcode==name_kjv) 
					sHTML += 'border-right:0px;border-top:2px;border-bottom:2px;border-style:dashed;border-color:#789DB3;';
				sHTML +='">'+j+'</td>';				
				sHTML += '<td width="49%"';
				if (hashcode==name_ckjv||hashcode==name_kjv) 
					sHTML += ' style="border-right:2px;border-left:0px;border-top:2px;border-bottom:2px;border-style:dashed;border-color:#789DB3;"';
				sHTML +='>';  
				sHTML += '<a name="'+name_kjv+'" id="'+name_kjv+'"></a>' + bible_kjv; 
				sHTML += '</td>'; 
			}
			sHTML += '</tr>'; 
			j++; 
		} 
		sHTML += '</table>';			
	}
	sHTML += writeRemark();
	sHTML += '</div></div>';
	sHTML += '<input name=currentBook type="hidden" value="'+bnum+'"><input name=currentChapter type="hidden" value="'+cnum+'">';
	return sHTML; 
}

function readBible(bnum, cnum, hashcode){
	var sHTML = "";
	var frm = document.frmSearch;	
	if (!loaded_kjv && frm.chkKJV.checked) return;	
	if (!frm.chkCKJV.checked && !frm.chkKJV.checked)  {
		alert("請選擇顯示設定。");
		return;			
	}
	if ((bnum < 0) || (bnum >= 66)) bnum = 0;
	if ((bnum <= 0) && (cnum < 0)) cnum = 0;
	if ((bnum >= 65) && (cnum >=22)) cnum = 21;
	if (cnum < 0) { bnum--; cnum = book_chapters[bnum+1] - book_chapters[bnum]-1;}
	if (cnum >= book_chapters[bnum+1] - book_chapters[bnum]) { bnum++; cnum = 0; }
	setLeftNavHighlight(bnum);	
	sHTML = writeChapterNav(bnum, cnum);
	sHTML += writeChapter(bnum, cnum, hashcode);
	changeContent(sHTML, "wrapper");	
	resetPos();
	if (hashcode.length!=0 && $get(hashcode)) {
		$get("scrollbody").scrollTop=$get(hashcode).offsetParent.offsetTop;
		$get("framecontent").scrollTop=$get("leftnav_"+bnum).offsetTop;
	} else {
		$get("scrollbody").scrollTop=0;
	}	
	window.onresize = resetPos;
	window.status = books[bnum] + ' 第' + (cnum+1) + '章';	
}	

function resetPos() {
	if ($get("pagenav")){
		// it needed "px" at the end to make Firefox work.
		$get("scrollbody").style.height=$get("wrapper").offsetHeight-$get("pagenav").offsetHeight + "px";
		$get("scrollbody").style.top=$get("pagenav").offsetHeight+1 + "px";
		$get("selectfontsize").style.top=$get("pagenav").offsetHeight + "px";
	} else {
		$get("selectfontsize").style.top="0";
	}
	if ($get("scrollcontent").clientHeight < $get("scrollbody").clientHeight) {
		$get("scrollcontent").style.height = $get("scrollbody").clientHeight + "px";
	}
}

function highlight(s) {
	var sResult = s;
	while (sResult.indexOf("<HY>") >= 0) {
		if (document.frmSearch.compare.checked) {
			sResult = sResult.replace("<HY>", "<span style=\'border-bottom:2px dotted\'>");
			sResult = sResult.replace("</HY>", "</span>");
		} else {
			sResult = sResult.replace("<HY>", "");
			sResult = sResult.replace("</HY>", "");
			sResult = removeEnglish(sResult, 0);
		}
	}
	while (sResult.indexOf("[") >= 0) {
		sResult = sResult.replace("[", "<i>");
		sResult = sResult.replace("]", "</i>");
	}
	return sResult;
}

function removeHighlight(s) {
	var sResult = s;
	while (sResult.indexOf("<HY>") >= 0) {
		sResult = sResult.replace("<HY>", "");
		sResult = sResult.replace("</HY>", "");
	}
	return sResult;
}

function removeEnglish(s, pos) {
	var sResult = s;
	if (isChinese(s)) {
		pos = sResult.indexOf("（", pos);
		if (pos >= 0) {
			if (isCharacter(sResult.charAt(pos+1))) {
				var pos2 = sResult.indexOf("）", pos+1);
				sResult = sResult.substring(0, pos) + sResult.substring(pos2+1, sResult.length);
				sResult = removeEnglish(sResult, pos);
			} else {
				sResult = removeEnglish(sResult, pos+1);
			}
		}
	}
	return sResult;
}

function showHideElement(id) {	
	if (document.getElementById) { // DOM3 = IE5, NS6
		if ($get(id).style.display == 'none') {
			$get(id).style.display = 'block';
			$get(id + "_arrow").src = "image/collapse.gif";
		} else {
			$get(id).style.display = 'none';
			$get(id + "_arrow").src = "image/expand.gif";
		}
	} else {
		if (document.layers) { // Netscape 4
			if (document.id.display == 'none') {
				document.id.display = 'block';
				
			} else {
				document.id.display = 'none';
			}
		} else { // IE 4
			if (document.all.id.style.display == 'none')
				document.all.id.style.display = 'block';
			else 
				document.all.id.style.display = 'none';
		}
	}
}

function formValidate (entry) {
	var frm = document.frmSearch;	
	if (!loaded_kjv && frm.chkKJV.checked) return;	
	for (i = 0; i <  frm.scope.length; i++)
		if (frm.scope[i].checked) scope = frm.scope[i].value;
	if ((entry.length < 1)||(entry=='關鍵字')) {
		alert("請輸入搜尋字串。");
		return;
	}		
	if (!frm.chkCKJV.checked && !frm.chkKJV.checked)  {
		alert("請選擇顯示設定。");
		return;			
	}
	while (entry.charAt(0) == ' ') {
		entry = entry.substring(1,entry.length);
		frm.txtSearch.value = entry;
	}
	while (entry.charAt(entry.length - 1) == ' ') {
		entry = entry.substring(0,entry.length - 1);
		frm.txtSearch.value = entry;
	}	
	while (entry.indexOf("　") >= 0) {
		entry = entry.replace("　", " ");
	}
	var searchArray = entry.split(" ");
	goSearch(searchArray);
}

function goSearch(t){
	var frm = document.frmSearch;
	var kjv = frm.chkKJV.checked;
	var ckjv = frm.chkCKJV.checked;
	var exact = frm.chkExact.checked;
	var scopeStart = 0;
	var scopeEnd = 0;
	if (scope == "all") {scopeStart=0; scopeEnd=profiles.length - 1; } 
	else if (scope == "oldtest") {scopeStart=0; scopeEnd=lines[book_chapters[39] - 1]; } 
	else if (scope == "newtest") {scopeStart=lines[book_chapters[39]]; scopeEnd = profiles.length - 1; } 
	else {
		if (frm.scopeList.selectedIndex < 0) {alert("請選擇搜尋範圍。"); return; } else {
			for (k = 0; k < frm.scopeList.options.length; k++) {
				if (frm.scopeList.options[k].selected) break;
			}
			scopeStart = lines[book_chapters[eval(frm.scopeList.options[k].value)]];
			scopeEnd = profiles.length - 1;
		}
	}
	var found = 0;
	var findings = new Array(0);
	var findings_kjv = new Array(0);
	nowbook = 0;
	nowchapter = 0;
	for (i = scopeStart; i <= scopeEnd; i++) {
		var ok = (frm.method[0].checked) ? true: false;
		if (ckjv) {
			var bible = profiles[i];
			//bible = bible.replace(/<HY>/g, "");
			//bible = bible.replace(/<\/HY>"/g, "");
			//bible = removeEnglish(bible, 0);
			var compareElement = bible.substring(bible.indexOf(" ")+1).toUpperCase();
		}
		if (kjv) {
			var bible_kjv = profiles_kjv[i];
			var compareElement_kjv = bible_kjv.substring(bible_kjv.indexOf(" ")+1).toUpperCase();
		}		
		for (j = 0; j < t.length; j++) {
			var compareString = t[j].toUpperCase();
			if (!compareString.length) continue;
			if (frm.method[0].checked) {
				if ((!ckjv || findStr(removeEnglish(removeHighlight(compareElement)), compareString, exact) < 0)
						&& (!kjv || findStr(compareElement_kjv, compareString, exact) < 0)) {
					ok = false;
					break;
				}
			} else {
				if ((ckjv && findStr(removeEnglish(removeHighlight(compareElement)), compareString, exact) >= 0)
						|| (kjv && findStr(compareElement_kjv, compareString, exact) >= 0)) {
					ok = true;
				}					
			}
			while(lines[book_chapters[nowbook]+nowchapter+1]-1 < i) {
				nowchapter++;
				if(nowchapter + book_chapters[nowbook] > book_chapters[nowbook+1]) {nowchapter=0;	nowbook++;}
			} 
			if (nowchapter+book_chapters[nowbook] >= book_chapters[nowbook+1]) {nowbook++; nowchapter=0;}	
			findbook[found] = nowbook;
			findchapter[found] = nowchapter;
			if (ckjv) bible = markFound(bible, compareString, exact);
			if (kjv) bible_kjv = markFound(bible_kjv, compareString, exact);			
		}
		if (ok) {
			if (ckjv) findings[findings.length] = bible;
			if (kjv) findings_kjv[findings_kjv.length] = bible_kjv;
			found++;
		}
		if (scope == "custom" && i == lines[book_chapters[eval(frm.scopeList.options[k].value)+1]]-1) {
			k++;
			for (; k < frm.scopeList.options.length; k++) {
				if (frm.scopeList.options[k].selected) break;
			}
			if (k >= frm.scopeList.options.length) break;
			i = lines[book_chapters[eval(frm.scopeList.options[k].value)]];
			scopeEnd = profiles.length - 1;
		}
	}
	if (found) formatResults(findings, findings_kjv, currentMatch, showMatches);
		else noMatch(); 
}

function noMatch() {
	var frm = document.frmSearch;
	var sHTML = '';
	sHTML += '<div id="scrollbody"><div id="scrollcontent" class="fontSize' + fontsize + '">';
	sHTML += writeSetFontSize();	
	sHTML += '<table class="infotable">';
	sHTML += '<tr><td class="thdrcell">搜尋字串</td><td class="tdatacell">' + frm.txtSearch.value + '</td></tr>';
	sHTML += '<tr><td class="thdrcell">搜尋結果</td><td class="tdatacell">找不到相關的經文。</td></tr>';
	sHTML += '</table>';
	sHTML += '</div></div>';	
		
	changeContent(sHTML, "wrapper");
	frm.txtSearch.select();
	window.status = '';
	resetPos();
}

function formatResults(resultCKJV, resultKJV, reference, offset) {
	var frm = document.frmSearch;
	var kjv = frm.chkKJV.checked;
	var ckjv = frm.chkCKJV.checked;
	if (ckjv) var currRec = ((resultCKJV.length < (reference + offset)) ? resultCKJV.length : (reference + offset));
	  else var currRec = ((resultKJV.length < (reference + offset)) ? resultKJV.length : (reference + offset));
	var sHTML = "";
	sHTML += '<div id="scrollbody"><div id="scrollcontent" class="fontSize' + fontsize + '">';
	sHTML += writeSetFontSize();	
	sHTML += '<table class="infotable">';
	sHTML += '<tr><td class="thdrcell">搜尋字串</td><td class="tdatacell">' + frm.txtSearch.value + '</td></tr>';
	sHTML += '<tr><td class="thdrcell">搜尋結果</td><td class="tdatacell">' +  + (reference + 1) + ' - ' + currRec + ' / ' + (resultCKJV.length==0?resultKJV.length:resultCKJV.length) + '</td></tr>';
	sHTML += '</table>';
	sHTML += '<table class="maintable">';
	for (var i = reference; i < currRec; i++) {			
		if (kjv || ckjv) {  	
			if (ckjv) {
				var lnCKJV = highlight(resultCKJV[i].substring(resultCKJV[i].indexOf(" "), resultCKJV[i].length));
				var idxCKJV = resultCKJV[i].substring(0, resultCKJV[i].indexOf(" "));
			} 
			if (kjv) {
				var lnKJV = highlight(resultKJV[i].substring(resultKJV[i].indexOf(" "), resultKJV[i].length));			
				var idxKJV = resultKJV[i].substring(0, resultKJV[i].indexOf(" "));	
			}		
			sHTML += '<tr>';
			sHTML += '<td width="3%" nowrap>';
			sHTML += '<a href="#" onClick="readBible(' + findbook[i]+ ', ' + findchapter[i]+',\''+ ((ckjv)?idxCKJV:idxKJV) +'\'); return false;" OnMouseover="return true;">' + ((ckjv)?idxCKJV:idxKJV) + '</a>';
			sHTML += '</td>';
			sHTML += '<td ' + ((ckjv && kjv)?'width="47%"':'width="94%"') +' >' + ((ckjv)?lnCKJV:lnKJV) + '</td>';
			if (ckjv && kjv) {
				sHTML += '<td width="3%" nowrap style="border-left:1px solid #C0C0C0;">';
				sHTML += '<a href="#" onClick="readBible(' + findbook[i]+ ', ' + findchapter[i]+',\''+idxKJV+'\'); return false;" OnMouseover="return true;">' + idxKJV + '</a>';
				sHTML += '</td>';
				sHTML += '<td width="47%">' + lnKJV + '</td>';
				sHTML += '</tr>';
			}			
		}
	} 
	sHTML += '</table>';
	sHTML += writeRemark();
	sHTML += '</div></div>';
	frm.txtSearch.select();	
	changeContent(sHTML, "wrapper");
	window.status = '';
	resetPos();		
}

function isChinese(str) {
	var i;
	if(str.length == 0) return false;
	for(i = 0; i < str.length; i++) {
		if(str.charCodeAt(i) > 128)
		return true;
	}
	return false;
}

function isCharacter(cCharacter) {
	var sFormat = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	if (sFormat.indexOf( cCharacter, 0 ) == -1 ) return false;
	return true;
}

function findStr(line, pattern, exact) {
	var pos;
	var myLine = new String(line);
	pos = myLine.indexOf(pattern);
	if (pos >= 0 && exact && !isChinese(pattern)) {

		var matched;
		do {
			matched = true;
			if (pos > 0 && isCharacter(myLine.substring(pos-1, pos))
					|| pos+pattern.length+1 < myLine.length && isCharacter(myLine.substring(pos+pattern.length, pos+pattern.length+1))) {
				matched = false;
				pos = myLine.indexOf(pattern, pos+1);
			}
		} while (!matched && pos >= 0);
	}
	return pos;
}

function findHYPos(bible) {
	var result = new Array();
	var pos = 0;
	var pos1;
	var pos2;
	var start;
	var i = 0;
	do {
		pos1 = bible.indexOf("<HY>", pos);
		pos2 = bible.indexOf("</HY>", pos);
		if (pos1 >= 0 && pos2 >= 0) {
			if (pos1 < pos2) {
				pos = pos1;
				start = 1;
			} else {
				pos = pos2;
				start = 0;
			}
		} else if (pos1 >= 0) {
			pos = pos1;
			start = 1;
		} else if (pos2 >= 0) {
			pos = pos2;
			start = 0;
		} else {
			alert(1);
			break;
		}
		var temp = new Array();
		temp[0] = pos;
		temp[1] = start;
		result[i++] = temp;
		pos++;
	} while (pos >= 0);
	return result;
}

function markFound(bible, pattern, exact) {
	var temp;
	temp = bible.substring(0, bible.indexOf(" ")+1);
	bible = bible.substring(bible.indexOf(" ")+1);
	if (!document.frmSearch.compare.checked) {
		bible = removeEnglish(removeHighlight(bible));
	}
	while((pos = findStr(bible.toUpperCase(), pattern.toUpperCase(), exact)) != -1) {
		temp += bible.substring(0, pos);
		temp += '<font style=\'background-color:#ffffb0\'>';
		temp += bible.substring(pos, pos + pattern.length);
		temp += '</font>';
		bible = bible.substring(pos + pattern.length);
	}
	temp += bible;
	return temp;
}

function putHY(value, hyPos, offset) {
	if (document.frmSearch.compare.checked) {
		var i;
		var temp;
		for (i = hyPos.length-1; i >= 0; i--) {
			if (hyPos[i][0] >= offset && hyPos[i][0] < offset + before.length) {
				value = value.substring(0, hyPos[i][0])
						+ (hyPos[i][1] == 1 ? "<HY>":"</HY>");
						+ value.substring(hyPos[i][0]);
			}
		}
	}
	return value;
}

function getQueryString(key, default_) {
	if (default_==null) default_=""; 
	key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
	var qs = regex.exec(window.location.href);
	if(qs == null) return default_;
		else return qs[1];
}

function gotoBible(gotoString) {
	var i;
	var nowbook = 0;
	var nowchapter = 0;
	var found = false;
	for (i = 0; i < profiles.length; i++) {
		if (profiles[i].indexOf(gotoString + ' ') == 0) {
			found = true;
			break;
		}
	}
	if (found) {
		while(lines[book_chapters[nowbook]+nowchapter+1]-1 < i) {
			nowchapter++;
			if(nowchapter + book_chapters[nowbook] > book_chapters[nowbook+1]) {
				nowchapter = 0;
				nowbook++;
			}
		}
		readBible(nowbook, nowchapter, gotoString);
	}
}

function changeStyle(num) {
	if (num != fontsize) {
		$get("scrollcontent").className = "fontSize" + num;
		fontsize = num;
	}
	resetPos();
}

function setCookie(name,value,days_expires) {
	var exp = new Date();
	exp.setTime(exp.getTime() + (days_expires*60*60));
	document.cookie = name + "=" + escape(value) + ";path=/" + ((days_expires == 0)? " " : "; expires=" + exp.toGMTString());
}
function getCookie(name) {
	var rtn = "";
	if (document.cookie.match(new RegExp(name + "\\=([^\\;])[\\;]{0,1}", "gi")))
		rtn = unescape(RegExp.$1);		
	return rtn;
}		
function pressArrowKeys(){
	var frm = document.frmSearch;
	if ($get("pagenav")
			&& document.activeElement.id != 'txtSearch'
			&& event.shiftKey && (event.keyCode==37 || event.keyCode==39 || event.keyCode==38 || event.keyCode==40)
			&& frm.currentBook) {
		var currentBook = eval(frm.currentBook.value);
		var currentChapter = eval(frm.currentChapter.value);
		if (event.keyCode==37) { //press left arrow key
			if (!(currentBook==0&&currentChapter==0)) {
				readBible(currentBook,currentChapter-1,1);
			}
		} else if (event.keyCode==39) {//press right arrow key
			if (!(currentBook==65 && currentChapter==21)) {
				readBible(currentBook,(currentChapter+1),1);
			}
		} else if (event.keyCode==38) { //press up arrow key
			if (currentBook!=0) {
				readBible(currentBook-1,0,1);
				$get("framecontent").scrollTop=$get("leftnav_"+(currentBook-1)).offsetTop;
			}
		} else if (event.keyCode==40) { //press down arrow key
			if (currentBook!=65) {
				readBible(currentBook+1,0,1);
				$get("framecontent").scrollTop=$get("leftnav_"+(currentBook+1)).offsetTop;
			}
		}
		window.scrollbody.focus();
		return false;
	}
}

function printdatabase() {
	for (i = 0; i <= profiles.length-1; i++) {
		profiles.length - 1;
		document.write(removeEnglish(profiles[i]) + "<BR>");
	}
}
function printDatabaseNoIndex() {
	for (i = 0; i <= profiles.length-1; i++) {
		profiles.length - 1;
		verse = removeEnglish(profiles[i]).split(" ")[1];
		document.write(verse + "<BR>");
	}
}
