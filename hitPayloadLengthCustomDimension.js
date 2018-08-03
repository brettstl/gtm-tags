function() {
  // Change this index to match that of the Custom Dimension you created in GA
  var customDimensionIndex = 7;
  
  return function(model) {
    
    var globalSendTaskName = '_' + model.get('trackingId') + '_sendHitTask';
    
    var originalSendHitTask = window[globalSendTaskName] = window[globalSendTaskName] || model.get('sendHitTask');
    
    model.set('sendHitTask', function(sendModel) {
      
      try {
        
        var originalHitPayload = sendModel.get('hitPayload');
        
        var hitPayload = sendModel.get('hitPayload');
        var customDimensionParameter = '&cd' + customDimensionIndex;
      
        // If hitPayload already has that Custom Dimension, note this in the console and do not overwrite the existing dimension
      
        if (hitPayload.indexOf(customDimensionParameter + '=') > -1) {
          
          console.log('Google Analytics error: tried to send hit payload length in an already assigned Custom Dimension');
          originalSendHitTask(sendModel);
        
        } else {
      
        // Otherwise add the Custom Dimension to the string
        // together with the complete length of the payload
          hitPayload += customDimensionParameter + '=';
          hitPayload += (hitPayload.length + hitPayload.length.toString().length);
        
          sendModel.set('hitPayload', hitPayload, true);
          originalSendHitTask(sendModel);
        
        }
      } catch(e) {
       
        console.error('Error sending hit payload length to Google Analytics');
        sendModel.set('hitPayload', originalHitPayload, true);
        originalSendHitTask(sendModel);
        
      }
    });
  };
}