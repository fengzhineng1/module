
(function (window, factory) {

    if (typeof exports === 'object') {
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
   
        define(factory);
    } else {
        debugger;
        window.outedatedBrowser = factory;
    }

})(this, function (options) {
    console.log(options);
    var isChrome = false;

    if(options.mode == 'chrome'){
        isChrome = true;
    }

    if((!(window.navigator.userAgent.indexOf("Chrome") !== -1))){
        if(isChrome){
            //非chrome浏览器中，全屏展示下载提示
            var OutdatedChrome = '<div id="outdatedChrome"><h6>您的浏览器已过时</h6><p>下载chrome浏览器<a id="btnUpdateBrowser1" href="http://rj.baidu.com/soft/detail/14744.html?ald">现在升级</a></p></div>';
            var OutdatedChromeDiv = document.createElement('div');
            OutdatedChromeDiv.innerHTML = OutdatedChrome;
            document.body.insertBefore(OutdatedChromeDiv,document.body.children[0]);

            var ouDatedChrome = document.getElementById('outdatedChrome');
            ouDatedChrome.style.display = 'block';
            document.body.style.overflowY = 'hidden';
        }else{
            //IE浏览器下载提示
            var OutdatedIE = '<div id="outdated"><h6>您的浏览器已过时</h6><p>要正常浏览本网站请升级您的浏览器。<a id="btnUpdateBrowser" href="http://outdatedbrowser.com/zh-cn">现在升级</a></p> <p class="last"><a href="#" id="btnCloseUpdateBrowser" title="关闭">&times;</a></p></div>';
            var OutdatedDivIE = document.createElement('div');
            OutdatedDivIE.innerHTML = OutdatedIE;
            document.body.insertBefore(OutdatedDivIE,document.body.children[0]);
            var outdated = document.getElementById("outdated");

            // Default settings
            this.defaultOpts = {
                bgColor: '#f25648',
                color: '#ffffff',
                mode: 'transform',
                languagePath: '../outdatedbrowser/lang/en.html'
            }

            if (options) {
                //assign css3 property to IE browser version
                if (options.mode == 'IE8' || options.mode == 'borderSpacing') {
                    options.mode = 'borderSpacing';
                } else if (options.mode == 'IE9' || options.mode == 'boxShadow') {
                    options.mode = 'boxShadow';
                } else if (options.mode == 'IE10' || options.mode == 'transform' || options.mode == '' || typeof options.mode === "undefined") {
                    options.mode = 'transform';
                } else if (options.mode == 'IE11' || options.mode == 'borderImage') {
                    options.mode = 'borderImage';
                }
                //all properties
                this.defaultOpts.bgColor = options.bgColor;
                this.defaultOpts.color = options.color;
                this.defaultOpts.mode = options.mode;
                this.defaultOpts.languagePath = options.languagePath;

                bkgColor = this.defaultOpts.bgColor;
                txtColor = this.defaultOpts.color;
                cssProp = this.defaultOpts.mode;
                languagePath = this.defaultOpts.languagePath;
            } else {
                bkgColor = this.defaultOpts.bgColor;
                txtColor = this.defaultOpts.color;
                cssProp = this.defaultOpts.mode;
                languagePath = this.defaultOpts.languagePath;
            } //end if options


            //Define opacity and fadeIn/fadeOut functions
            var done = true;

            function function_opacity(opacity_value) {
                outdated.style.opacity = opacity_value / 100;
                outdated.style.filter = 'alpha(opacity=' + opacity_value + ')';
            }

            function function_fade_in(opacity_value) {
                function_opacity(opacity_value);
                if (opacity_value == 1) {
                    outdated.style.display = 'block';
                }
                if (opacity_value == 100) {
                    done = true;
                }
            }

            var supports = ( function() {
                var div = document.createElement('div');
                var vendors = 'Khtml Ms O Moz Webkit'.split(' ');
                var len = vendors.length;

                return function(prop) {
                    if (prop in div.style) return true;

                    prop = prop.replace(/^[a-z]/, function(val) {
                        return val.toUpperCase();
                    });

                    while (len--) {
                        if (vendors[len] + prop in div.style) {
                            return true;
                        }
                    }
                    return false;
                };
            } )();

            //if browser does not supports css3 property (transform=default), if does > exit all this
            if (!supports('' + cssProp + '')) {
                if (done && outdated.style.opacity !== '1') {
                    done = false;
                    for (var i = 1; i <= 100; i++) {
                        setTimeout(( function(x) {
                            return function() {
                                function_fade_in(x);
                            };
                        } )(i), i * 8);
                    }
                }
            } else {
                return;
            } //end if

            //Check AJAX Options: if languagePath == '' > use no Ajax way, html is needed inside <div id="outdated">
            if (languagePath === ' ' || languagePath.length == 0) {
                startStylesAndEvents();
            } else {
                grabFile(languagePath);
            }

            //events and colors
            function startStylesAndEvents() {
                var btnClose = document.getElementById("btnCloseUpdateBrowser");
                var btnUpdate = document.getElementById("btnUpdateBrowser");

                //check settings attributes
                outdated.style.backgroundColor = bkgColor;
                //way too hard to put !important on IE6
                outdated.style.color = txtColor;
                outdated.children[0].style.color = txtColor;
                outdated.children[1].style.color = txtColor;

                //check settings attributes
                btnUpdate.style.color = txtColor;
                // btnUpdate.style.borderColor = txtColor;
                if (btnUpdate.style.borderColor) {
                    btnUpdate.style.borderColor = txtColor;
                }
                btnClose.style.color = txtColor;

                //close button
                btnClose.onmousedown = function() {
                    outdated.style.display = 'none';
                    return false;
                };

                //Override the update button color to match the background color
                btnUpdate.onmouseover = function() {
                    this.style.color = bkgColor;
                    this.style.backgroundColor = txtColor;
                };
                btnUpdate.onmouseout = function() {
                    this.style.color = txtColor;
                    this.style.backgroundColor = bkgColor;
                };
            } //end styles and events


            // IF AJAX with request ERROR > insert english default
            var ajaxEnglishDefault = '<h6>Your browser is out-of-date!</h6>'
                + '<p>Update your browser to view this website correctly. <a id="btnUpdateBrowser" href="http://outdatedbrowser.com/">Update my browser now </a></p>'
                + '<p class="last"><a href="#" id="btnCloseUpdateBrowser" title="Close">&times;</a></p>';


            //** AJAX FUNCTIONS - Bulletproof Ajax by Jeremy Keith **
            function getHTTPObject() {
                var xhr = false;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    try {
                        xhr = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch ( e ) {
                        try {
                            xhr = new ActiveXObject("Microsoft.XMLHTTP");
                        } catch ( e ) {
                            xhr = false;
                        }
                    }
                }
                return xhr;
            }//end function

            function grabFile(file) {
                var request = getHTTPObject();
                if (request) {
                    request.onreadystatechange = function() {
                        displayResponse(request);
                    };
                    request.open("GET", file, true);
                    request.send(null);
                }
                return false;
            } //end grabFile

            function displayResponse(request) {
                var insertContentHere = document.getElementById("outdated");
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 304) {
                        insertContentHere.innerHTML = request.responseText;
                    } else {
                        insertContentHere.innerHTML = ajaxEnglishDefault;
                    }
                    startStylesAndEvents();
                }
                return false;
            }//end displayRespons
        }

    }

});







