$('.remove-item').on('click', function (e) {
  console.log('clicked remove-item btn');
  e.stopPropagation();
});

$('#loadButtonId').on('click', function (e) {
  value = $('#dateTimeAt').val()
  if (value === "" || value === null) {
    console.log("value not set, do not call database");
    e.stopPropagation();
    return;
  }
  console.log(value);
  // <li class="list-group-item"><span class="name">26.05.2021<button class="button btn btn-warning float-right"> <i class="fas fa-trash remove-item" aria-hidden="true"></i></button></span></li>
  date = value
  timeFrom = "10:00";
  timeTo = "11:00";
  htmlToAddli = `<li class="list-group-item"><span class="name">${date} - ${timeFrom} bis ${timeTo}<button class="button btn btn-warning float-right"> <i class="fas fa-trash remove-item" aria-hidden="true"></i></button></span></li>`
  console.log("faking the insert")
  $('#daysList').append(htmlToAddli);

  return;
  $.ajax({
    /*url*/
    type: "POST",
    url: "fachschaftler/getTimesForDate",
    data: JSON.stringify({
      fachschaftler_id: "2",
      test: "works",
      date: value
    }),  //fake it till you make it
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      console.log("Success at ajax Side. Data returned =" + data);
      if (data) {
        $('#daysList').empty();
        data.times.forEach(element => {
          let htmlToAddli = `<li class="list-group-item"><span class="name">${element.date} - ${element.timeFrom} bis ${element.timeTo}<button class="button btn btn-warning float-right"> <i class="fas fa-trash remove-item" aria-hidden="true"></i></button></span></li>`
          $('#daysList').append(htmlToAddli);
        });
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr)
      alert(xhr.responseText);
      console.log(ajaxOptions)
      console.log(thrownError)
    },
  });

});
