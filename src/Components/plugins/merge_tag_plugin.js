const mergeTag = {
  // @Required
  // plugin name
  name: 'merge_tag',


  // @Required
  // data display
  display: 'submenu',

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {

    // Generate submenu HTML
    // Always bind "core" when calling a plugin function
    let listDiv = this.setSubmenu.call(core);

    // You must bind "core" object when registering an event.
    /** add event listeners */
    var self = this;
    listDiv.querySelectorAll('.se-btn-list').forEach(function (btn) {
      btn.addEventListener('click', self.onClick.bind(core));
    });



    // @Required
    // You must add the "submenu" element using the "core.initMenuTarget" method.
    /** append target button menu */
    core.initMenuTarget(this.name, targetElement, listDiv);
  },

  setSubmenu: function () {
    const phrases =
      [
        ' HOT!',
        ' Super HOT!',
        ' FREE!',
        ' when you check out via Subscribe & Save, with free shipping',
        ' when you `clip` the XXX off coupon and check out via Subscribe & Save',
        ' after coupon code XXX',
        ' with free shipping',
        ' with free shipping from $25',
        ' free shipping with Amazon Prime',
        ' with Coupon Code: XXX',
        ' after rebate',
        ' with free in-store pickup',
        ' (Send copy of UPC)',
        ' (Send original UPC)'
      ]

    var temp = ''

    phrases.map((item) => {
      var name = item.indexOf('!') > 0 ? `<span style='color:red'>${item}</span>` : item;
      // alert(`<span style='color:red'>${item}</span>`)
      temp += `<li><button  type="button" class="se-btn-list sun-editor-custom" value='${item}'>${name}</button></li>`
    })

    const listDiv = this.util.createElement('DIV',);

    // @Required
    // A "se-submenu" class is required for the top level element.

    listDiv.className = 'se-submenu se-list-layer';
    listDiv.innerHTML = `<div class="se-list-inner se-list-font-size">
                            <ul class="se-list-basic" >                               
                                ${temp}                              
                            </ul>
                          </div>`

    return listDiv;
  },

  onClick: function (e) {
    const value = e.target.value;

    var node = this.util.createTextNode(value);
    // const node = this.util.createElement('span');

    // this.util.addClass(node, 'se-custom-tag');
    if (value.indexOf('!') > 0) {
      node = this.util.createElement('b');
      node.style.color = 'red';
    }

    node.textContent = ' ' + value + ' ';

    this.insertNode(node);

    // this.insertAdjacentHTML('afterend',value);
    // const zeroWidthSpace = this.util.createTextNode(this.util.zeroWidthSpace);
    // node.parentNode.insertBefore(zeroWidthSpace, node.nextSibling);

    this.submenuOff();
  }
};

export default mergeTag