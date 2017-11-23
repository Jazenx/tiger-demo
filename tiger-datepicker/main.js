(function () {
  var datepicker = window.datepicker;
  var monthData;
  var $wrapper;
  datepicker.buildUI = function (year, month) {
    monthData = datepicker.getMonthData(year, month);
    var html = '<div class="tiger-datepicker-header">' +
      '<a href="#" class="tiger-datepicker-btn tiger-datepicker-prev-btn">&lt;</a>' +
      '<a href="#" class="tiger-datepicker-btn tiger-datepicker-next-btn">&gt;</a>' +
      '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
      '</div>' +
      '<div class="tiger-datepicker-body">' +
      '<table>' +
      '<thead>' +
      '<tr>' +
      '<th>一</th>' +
      '<th>二</th>' +
      '<th>三</th>' +
      '<th>四</th>' +
      '<th>五</th>' +
      '<th>六</th>' +
      '<th>日</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';
    for (var i = 0; i < monthData.days.length; i++) {
      var date = monthData.days[i];
      if (i % 7 === 0) {
        html += '<tr>';
      }
      html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';
      if (i % 7 === 6) {
        html += '</tr>';
      }
    }

    html += '</tbody></table></div>';
    return html;
  };

  datepicker.render = function (direction) {
    var year, month;
    if (monthData) {
      year = monthData.year;
      month = monthData.month;
    }
    if (direction === 'prev') {
      console.log('prev');
      month--;
    }
    if (direction === 'next') {
      console.log('next');
      month++;
    }
    var html = datepicker.buildUI(year, month);
    $wrapper = document.querySelector('.tiger-datepicker-wrapper');
    if (!$wrapper) {
      $wrapper = document.createElement('div');
      document.body.appendChild($wrapper);
      $wrapper.className = 'tiger-datepicker-wrapper';
    }
    $wrapper.innerHTML = html;
  }
  datepicker.init = function (input) {
    datepicker.render();
    var $input = document.querySelector(input);
    var isOpen = false;
    $input.addEventListener('click', function () {
      if (isOpen) {
        $wrapper.classList.remove('tiger-datepicker-wrapper-show');
        isOpen = false;
      } else {
        $wrapper.classList.add('tiger-datepicker-wrapper-show');
        var left = $input.offsetLeft;
        var top = $input.offsetTop;
        var height = $input.offsetHeight;
        $wrapper.style.top = top + height + 2 + 'px';
        $wrapper.style.left = left;
        isOpen = true;
      }
    }, false);
    $wrapper.addEventListener('click', function (e) {
      var $target = e.target;
      if (!$target.classList.contains('tiger-datepicker-btn')) {
        return
      }
      if ($target.classList.contains('tiger-datepicker-prev-btn')) {
        datepicker.render('prev');
      } else if ($target.classList.contains('tiger-datepicker-next-btn')) {
        datepicker.render('next');
      }
    }, false);
    $wrapper.addEventListener('click', function (e) {
      var $target = e.target;
      if ($target.tagName.toLowerCase() !== 'td') {
        return;
      }
      var date = new Date(monthData.year, monthData.month-1, $target.dataset.date);
      $input.value = format(date);
      $wrapper.classList.remove('tiger-datepicker-wrapper-show');
      isOpen = false;
    }, false)
  }
  function format(date) {
    ret = '';
    var padding = function(num) {
      if(num <= 9) {
        return '0'+num;
      }
      return num;
    }
    ret += date.getFullYear() + '-';
    ret += padding(date.getMonth()+1) + '-';
    ret += padding(date.getDate());
    return ret;
  }
})();