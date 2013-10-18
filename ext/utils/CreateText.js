/**
 * User: zhoufei
 * Date: 13-7-6
 * Time: 上午9:55
 * Class: 绘制Canvas文字
 */

/**
 * @constructor
 */
function CreateText(){
    // The property that will contain the buffer/cache canvas.
    this.bufferCanvas = null;
    // The property that will contain the cacheCanvas context.
    this.bufferContext = null;

    //是否使用X-CANVAS游戏引擎
    this.isXc=false;


    //默认文字配置
    this.fontFamily = "Verdana";
    this.fontWeight = "normal";
    this.fontSize = "12px";
    this.fontColor = "#000";
    this.fontStyle = "normal";
    this.textAlign = "start";
    this.textBaseline = "alphabetic";
    this.lineHeight = "16";
    this.textShadow = null;

    /**
     * 文字基本配置
     * {
     *   isXc:false,
     *  fontFamily: "Verdana",
     *  fontSize: "14px",
     *  fontWeight: "normal",
     *  fontColor: "#000",
     *  lineHeight: "22"
     *  }
     * @param config
     */
    this.config=function(config){
        if(typeof config !="object"){
            console.log("Invalid Configuration");
            return false;
        }

        var property;
        for(property in config){
           this[property]=config[property];
        }
    }

    /**
     * 绘制文字，导出Canvas
     * @param textInfo：文本信息
     * @param canvasWidth  ：Canvas宽度
     * @param canvasHeight  ：Canvas高度
     * @returns Image
     */
    this.drawTextToCanvas=function(text,canvasWidth,canvasHeight){
        this.bufferCanvas == null;
        this.getBufferCanvas(canvasWidth,canvasHeight);
        // Set the color.
        this.bufferContext.fillStyle = this.fontColor;
        // Set the size & font family.
        this.bufferContext.font = this.fontWeight + ' ' + this.fontSize + ' ' + this.fontFamily;

        var textInfo={};
        textInfo.text=text;
        textInfo.x=0;
        textInfo.y=parseInt(this.fontSize.replace("px",""));
        this.drawStyledText(textInfo);

        return this.bufferCanvas;

    }

    /**
     * The "painter". This will draw the styled text.
     */
    this.drawStyledText = function (textInfo) {
        // Save the textInfo into separated vars to work more comfortably.
        var text = textInfo.text, x = textInfo.x, y = textInfo.y;
        // Needed vars for automatic line break;
        var splittedText, xAux, textLines = [], boxWidth = this.bufferCanvas.width;
        // Declaration of needed vars.
        var proFont = [], properties, property, propertyName, propertyValue;
        var proColor, proText, proShadow;
        // Loop vars
        var i, j, k, n;

        // The main regex. Looks for <style>, <class> or <br /> tags.
        var match = text.match(/<\s*br\s*\/>|<\s*style=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/style\s*\>|[^<]+/g);
        var innerMatch = null;

        // Let's draw something for each match found.
        for (i = 0; i < match.length; i++) {
            // Save the current context.
            this.bufferContext.save();
            // Default color
            proColor = this.fontColor;
            // Default font
            proFont.style = this.fontStyle;
            proFont.weight = this.fontWeight;
            proFont.size = this.fontSize;
            proFont.family = this.fontFamily;

            // Default shadow
            proShadow = this.textShadow;

            // Check if current fragment is an style tag.
            if (/<\s*style=/i.test(match[i])) {
                // Looks the attributes and text inside the style tag.
                innerMatch = match[i].match(/<\s*style=["|']([^"|']+)["|']\s*\>([^>]+)<\s*\/style\s*\>/);

                // innerMatch[1] contains the properties of the attribute.
                properties = innerMatch[1].split(";");

                // Apply styles for each property.
                for (j = 0; j < properties.length; j++) {
                    // Each property have a value. We split them.
                    property = properties[j].split(":");
                    // A simple check.
                    if (this.isEmpty(property[0]) || this.isEmpty(property[1])) {
                        // Wrong property name or value. We jump to the
                        // next loop.
                        continue;
                    }
                    // Again, save it into friendly-named variables to work comfortably.
                    propertyName = property[0];
                    propertyValue = property[1];

                    switch (propertyName) {
                        case "font":
                            proFont = propertyValue;
                            break;
                        case "font-family":
                            proFont.family = propertyValue;
                            break;
                        case "font-weight":
                            proFont.weight = propertyValue;
                            break;
                        case "font-size":
                            proFont.size = propertyValue;
                            break;
                        case "font-style":
                            proFont.style = propertyValue;
                            break;
                        case "text-shadow":
                            proShadow = this.trim(propertyValue);
                            proShadow = proShadow.split(" ");
                            if (proShadow.length != 4) {
                                proShadow = null;
                            }
                            break;
                        case "color":
                            if (this.isHex(propertyValue)) {
                                proColor = propertyValue;
                            }
                            break;
                    }
                }
                proText = innerMatch[2];
            } else if (/<\s*br\s*\/>/i.test(match[i])) {
                // Check if current fragment is a line break.
                y += parseInt(this.lineHeight, 10) * 1.5;
                x = textInfo.x;
                continue;
            } else {
                // Text without special style.
                proText = match[i];
            }

            // Set the text Baseline
            this.bufferContext.textBaseline = this.textBaseline;
            // Set the text align
            this.bufferContext.textAlign = this.textAlign;
            // Font styles.
            if (proFont instanceof Array) {
                this.bufferContext.font = proFont.style + " " + proFont.weight + " " + proFont.size + " " + proFont.family;
            } else {
                this.bufferContext.font = proFont;
            }
            this.bufferContext.font = proFont;
            // Set the color.
            this.bufferContext.fillStyle = proColor;
            // Set the Shadow.
            if (proShadow != null) {
                this.bufferContext.shadowOffsetX = proShadow[0].replace("px", "");
                this.bufferContext.shadowOffsetY = proShadow[1].replace("px", "");
                this.bufferContext.shadowBlur = proShadow[2].replace("px", "");
                this.bufferContext.shadowColor = proShadow[3].replace("px", "");
            }

            // Reset textLines;
            textLines = [];
            // Clear javascript code line breaks.
            proText = proText.replace(/\s*\n\s*/g, " ");

            // Automatic Line break
            if (boxWidth !== undefined) {

                // If returns true, it means we need a line break.
                if (this.checkLineBreak(proText, (boxWidth+textInfo.x), x)) {
                    // Split text by words.
                    splittedText = this.trim(proText).split(" ");

                    // If there's only one word we don't need to make more checks.
                    if (splittedText.length == 1) {
                        textLines.push({text: this.trim(proText) + " ", linebreak: true});
                    } else {
                        // Reset vars.
                        xAux = x;
                        var line = 0;
                        textLines[line] = {text: undefined, linebreak: false};

                        // Loop words.
                        for (k = 0; k < splittedText.length; k++) {
                            splittedText[k] += " ";
                            // Check if the current text fits into the current line.
                            if (!this.checkLineBreak(splittedText[k], (boxWidth+textInfo.x), xAux)) {
                                // Current text fit into the current line. So we save it
                                // to the current textLine.
                                if (textLines[line].text == undefined) {
                                    textLines[line].text = splittedText[k];
                                } else {
                                    textLines[line].text += splittedText[k];
                                }

                                xAux += this.bufferContext.measureText(splittedText[k]).width;
                            } else {
                                // Current text doesn't fit into the current line.
                                // We are doing a line break, so we reset xAux
                                // to initial x value.
                                xAux = textInfo.x;
                                if (textLines[line].text !== undefined) {
                                    line++;
                                }

                                textLines[line] = {text: splittedText[k], linebreak: true};
                                xAux += this.bufferContext.measureText(splittedText[k]).width;
                            }
                        }
                    }
                }
            }

            // if textLines.length == 0 it means we doesn't need a linebreak.
            if (textLines.length == 0) {
                textLines.push({text: this.trim(proText) + " ", linebreak: false});
            }

            // Let's draw the text
            for (n = 0; n < textLines.length; n++) {
                // Start a new line.
                if (textLines[n].linebreak) {
                    y += parseInt(this.lineHeight, 10);
                    x = textInfo.x;
                }
                this.bufferContext.fillText(textLines[n].text, x, y);
                // Increment X position based on current text measure.
                x += this.bufferContext.measureText(textLines[n].text).width;
            }

            this.bufferContext.restore();
        }
    };




    /**
     * Create an Canvas
     */
    this.createCanvas = function () {
        this.bufferCanvas  =this.isXc?new Canvas(): document.createElement("canvas");
        this.bufferContext = this.bufferCanvas.getContext('2d');
    };

    this.getBufferCanvas = function (imageWidth,imageHeight) {
        this.createCanvas();
        this.bufferCanvas.width =imageWidth;
        this.bufferCanvas.height = imageHeight;
    };

    /**
     * Check if a line break is needed.
     */
    this.checkLineBreak = function (text, boxWidth, x) {
        return (this.bufferContext.measureText(text).width + x > boxWidth);
    };

    /**
     * A simple function to validate a Hex code.
     */
    this.isHex = function (hex) {
        return (/^(#[a-fA-F0-9]{3,6})$/i.test(hex));
    };
    /**
     * A simple function to check if the given value is a number.
     */
    this.isNumber = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    /**
     * A simple function to check if the given value is empty.
     */
    this.isEmpty = function (str) {
        // Remove white spaces.
        str = str.replace(/^\s+|\s+$/, '');
        return str.length == 0;
    };
    /**
     * A simple function clear whitespaces.
     */
    this.trim = function (str) {
        var ws, i;
        str = str.replace(/^\s\s*/, '');
        ws = /\s/;
        i = str.length;
        while (ws.test(str.charAt(--i))) {
            continue;
        }
        return str.slice(0, i + 1);
    };

}

