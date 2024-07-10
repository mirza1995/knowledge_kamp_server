import { NoteNotificationDTO } from '@/dto/notifications/note-notification-dto';

//Temporary solution
const header = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
   <head>
      <meta content="text/html; charset=UTF-8" http-equiv="Content-Type"/>
      <meta name="x-apple-disable-message-reformatting"/>
   </head>
   <body style="margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:rgb(255,255,255);font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
      <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;width:465px;border-radius:0.25rem;border-width:1px;border-style:solid;border-color:rgb(234,234,234);padding:20px">
         <tbody>
            <tr style="width:100%">
               <td>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
                     <tbody>
                        <tr>
                           <td>
                              <h1 style="margin-top:0px;margin-bottom:0px;padding:0px;text-align:center;font-size:30px;font-weight:400;color:rgb(0,0,0)"><strong>Knowledge Kamp</strong></h1>
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
                     <tbody>
                        <tr>
                           <td>`;

const footer = `</td>
                        </tr>
                     </tbody>
                  </table>
               </td>
            </tr>
         </tbody>
      </table>
   </body>
</html>`;

export const getEmailHtml = (notes: NoteNotificationDTO[]) => {
  return (
    header +
    notes
      .map(
        (
          note,
        ) => `<h1 style="margin-left:0px;margin-right:0px;margin-top:40px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:rgb(0,0,0)"><strong>${note.title}</strong></h1>
                              <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="text-align:justify;font-size:14px;color:rgb(0,0,0)">
                                 <tbody>
                                    <tr>
                                       <td>
                                          <p style="font-size:14px;line-height:24px;margin:16px 0">${note.content}</p>
                                       </td>
                                    </tr>
                                 </tbody>
                              </table>`,
      )
      .join('') +
    footer
  );
};
