function roundFractional(x, n) {
  return Math.round(x * Math.pow(10, n)) / Math.pow(10, n);
}
$(function(){
  var $width = $('#width'),
      $height = $('#height'),
      $btn = $('#calculate'),
      $perimeter = $('#perimeter'),
      $area = $('#area');
  $btn.click(function(){
    // 集中校验
    // validate if error return;
    if(!validate('#width') || !validate('#height')) return;

    var w = Number($width.val()),
        h = Number($height.val());
    var rect = rectangle();
    var p = roundFractional(rect.perimeter(w,h),2);
    var a = roundFractional(rect.area(w,h),2);
    $perimeter.val(p);
    $area.val(a);
  });

  // 1.event keypress
  // 2.event argument get key value, e.key and e.target.value
  // 3.illegal key filter (屏蔽非法按键),e.preventDefault()
  // 4.合法字符还要考虑出现的位置，例如. e E -
  $width.keypress(function(e){
    if(/[abcdf-zABCDF-Z`~!@#$%^&*()\-=_+[\]{}|;:'",<>/?\\]/.test(e.key)){
      e.preventDefault();
      return;
    }

    // 合法字符 e
    // 允许出现在非科学计数法的数字末尾
    // 允许出现在非科学计数法的数字中间
    //
    // 不允许出现在非科学计数法的数字前面
    //不允许出现在空文本中 
    // 不允许出现在负号后面
    //
    // 不允许出现在科学计数法数字（e和E）的末尾
    // 不允许出现在科学计数法数字的前面
    // 不允许出现在科学计数法数字的中间
    var pos = e.target.selectionStart, //按键位置
        con = e.target.value;
    if(e.key === 'e'){
      if(pos === 0 || con.indexOf('e') !== -1 || con.indexOf('E') !== -1){ //按下e的位置是否是首位，查询再次按e时前面是否出现过e，E
        e.preventDefault();
        return ;
      }
      if(pos === 1 && con.substring(0,1) === '-'){//e排在首位，e在负号后面
        e.preventDefault();
        return ;
      }
    }

    // 合法字符 E
    if(e.key === 'E'){
      if(pos === 0 || con.indexOf('e') !== -1 || con.indexOf('E') !== -1){ //按下e的位置是否是首位，查询再次按e时前面是否出现过e，E
        e.preventDefault();
        return ;
      }
      if(pos === 1 && con.substring(0,1) === '-'){//e排在首位，e在负号后面
        e.preventDefault();
        return ;
      }
    }
    // 合法字符 .
    if(e.key === '.'){
      if(pos === 0 || con.indexOf('.') !== -1){ //按下e的位置是否是首位，查询再次按e时前面是否出现过e，E
        e.preventDefault();
        return ;
      }
      if(pos === 1 && con.substring(0,1) === '-'){//e排在首位，e在负号后面
        e.preventDefault();
        return ;
      }
    }
    // 合法字符 -

  });
  // 同width宽度
  $height.keypress(function(e){});


  // 字段校验
  $width.focusout(function(){
    // if(!validate(width)) select this;
    if(!validate('#width')) $width.select();
  });

  $height.focusout(function(){
    // if(!validate(height)) select this;
    if(!validate('#height')) $height.select();
  });
  function validate(field){
    // get DOM error message
    var $data = $(field),
        $msg = $(field + '-validation-message');
    // validate null
    if($data.val() === ''){
      $msg.html('不能为空！');
      $data.select();
      return false
    }
    // validate number
    if(!(/^-?(0|[1-9]\d*)(\.\d*)?([eE][+-]?\d+)?$/.test($data.val()))){
      $msg.html('必须是数值！');
      $data.select();
      return false
    }
    // validate > 0
    if(Number($data.val()) < 0){
      $msg.html('必须大于零！');
      $data.select();
      return false
    }
    
    $msg.html('');
    return true;
  }
});  