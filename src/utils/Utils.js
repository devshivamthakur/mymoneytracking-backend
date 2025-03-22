import moment from "moment";
import { FirstLetterCapital, RupeeSymbol } from "./constants.js";
import fs from "fs"
import nodemailel from "nodemailer"

export const generateCsv = async (data, fileName) => {

    let csv = 'Amount, Category, Discription, Datetime \n';
    // Loop through the array and convert each element to a CSV row
    data.forEach((row) => {
        //check for a valid date
        if(moment(new Date(row.date)).isValid()){
            csv += `${RupeeSymbol}${row.amount}, ${FirstLetterCapital(row.category)}, ${row.discrption}, ${moment(new Date(row.date)).format("DD-MM-YYYY HH:mm:ss")} \n`;
        }
    });

    return csv;

}

export const generateCsvAndSendMail = async(data, fileName, email) => {
    const csv = await generateCsv(data, fileName);
    // Write the CSV to a file
    fs.writeFile(`./PastRecords/${fileName}`, csv, (err) => {
        if (err) {
            console.log("Error writing CSV file", err);
            return;
        }
        console.log("CSV file saved successfully");
        sendEmailWithAttachment(fileName, email);
    });
    
    // Send the email with the CSV attachment
    // sendMail(email, csv, fileName);
    console.log("Email sent successfully", );
}

// Function to send the email
function sendEmailWithAttachment(fileName, email) {
    const transporter = nodemailel.createTransport({
      service: 'gmail', // You can use any email service (e.g., 'hotmail', 'yahoo', etc.)
      auth: {
        user: process.env.EMAIL, // Replace with your email address
        pass: process.env.EMAIL_APP_PASSWORD // Replace with your email password (or use an app password)
      }
    });

    const path = `./PastRecords/${fileName}`
  
    const mailOptions = {
      from: process.env.EMAIL, // Sender email
      to: email, // Recipient email
      subject: `Transaction Records for the Past Year ${new Date().getFullYear() - 1}`, // Subject line
      text: `
      Dear User,

      Please find attached the transaction records for the past year.

      If you have any questions or need further information, feel free to contact me.

      Best regards,
      My Money Tracking App`,
      attachments: [
        {
          filename: `mmt-past-year-records-${new Date().getFullYear() - 1}.csv`, // Name of the CSV file
          path: path // Path to the CSV file
        }
      ],
      
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  
    //   Optional: Remove the CSV file after sending the email
      fs.unlink(path, (err) => {
        if (err) throw err;
        console.log('CSV file deleted after sending email.');
      });
    });
  }
  