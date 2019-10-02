const sendEmail = (toAddress, templateName, templateVars) => {
  /// setTimeout to simulate server async call
  setTimeout(() => {
    const templates = {
      registrationEmail: function(templateVars) {
        return [
          'Hello ' + templateVars.name + ',',
          'Thanks for signing up for our mailing list with the email address: ' +
            toAddress
        ].join('\n');
      }
    };

    const template = templateName + ' template';

    //This is were we would use the template that has been dynamically created using the
    //variables to send an email to the email address provided.

    console.log('Sending email to ' + toAddress);
    console.log(template);
    console.log('Successfully sent to ' + toAddress);

    return true;
  }, 1);
};

export default sendEmail;
