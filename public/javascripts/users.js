$('#demoBuchen').click(() => {
  console.log("DemoBuchen Clicked");
  $('#toastDemoBuchen').toast('show')
})

$('#demoDuplicateBtn').click(() => {
  console.log("toastDemoDuplicateBtn Clicked");
  $('#toastDemoDuplicate').toast('show')
})

$('#demoAlradyBooked').click(() => {
  console.log("demoAlradyBooked Clicked");
  $('#toastDemoAlreadyBooked').toast('show')
})

$('#demoError').click(() => {
  console.log("demoError Clicked");
  $('#toastDemoError').toast('show')
})

