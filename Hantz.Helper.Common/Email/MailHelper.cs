using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;

namespace HD.Helper.Common
{
    /// <summary>
    /// 邮件操作类
    /// </summary>
    public class MailHelper
    {
        #region 获取Email登陆地址
        /// <summary>
        /// 获取Email登陆地址
        /// </summary>
        /// <param name="email">email地址</param>
        /// <returns></returns>
        public static string GetEMailLoginUrl(string email)
        {
            if ((email == string.Empty) || (email.IndexOf("@") <= 0))
            {
                return string.Empty;
            }
            int index = email.IndexOf("@");
            email = "http://mail." + email.Substring(index + 1);
            return email;
        } 
        #endregion

        #region 发送邮件
        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="mailSubjct">邮件主题</param>
        /// <param name="mailBody">邮件正文</param>
        /// <param name="mailFrom">发送者</param>
        /// <param name="mailAddress">邮件地址列表</param>
        /// <param name="HostIP">主机IP</param>
        /// <returns></returns>
        public static string sendMail(string mailSubjct, string mailBody, string mailFrom, List<string> mailAddress, string HostIP)
        {
            string str = "";
            try
            {
                MailMessage message = new MailMessage
                {
                    IsBodyHtml = false,
                    Subject = mailSubjct,
                    Body = mailBody,
                    From = new MailAddress(mailFrom)
                };
                for (int i = 0; i < mailAddress.Count; i++)
                {
                    message.To.Add(mailAddress[i]);
                }
                new SmtpClient { UseDefaultCredentials = false, DeliveryMethod = SmtpDeliveryMethod.PickupDirectoryFromIis, Host = HostIP, Port = (char)0x19 }.Send(message);
            }
            catch (Exception exception)
            {
                str = exception.Message;
            }
            return str;
        }

        /// <summary>
        /// 发送邮件（要求登陆）
        /// </summary>
        /// <param name="mailSubjct">邮件主题</param>
        /// <param name="mailBody">邮件正文</param>
        /// <param name="mailFrom">发送者</param>
        /// <param name="mailAddress">接收地址列表</param>
        /// <param name="HostIP">主机IP</param>
        /// <param name="username">用户名</param>
        /// <param name="password">密码</param>
        /// <returns></returns>
        public static bool sendMail(string mailSubjct, string mailBody, string mailFrom, List<string> mailAddress, string HostIP, string username, string password)
        {
            bool flag;
            string str = sendMail(mailSubjct, mailBody, mailFrom, mailAddress, HostIP, 0x19, username, password, false, string.Empty, out flag);
            return flag;
        }

        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="mailSubjct">邮件主题</param>
        /// <param name="mailBody">邮件正文</param>
        /// <param name="mailFrom">发送者</param>
        /// <param name="mailAddress">接收地址列表</param>
        /// <param name="HostIP">主机IP</param>
        /// <param name="filename">附件名</param>
        /// <param name="username">用户名</param>
        /// <param name="password">密码</param>
        /// <param name="ssl">加密类型</param>
        /// <returns></returns>
        public static string sendMail(string mailSubjct, string mailBody, string mailFrom, List<string> mailAddress, string HostIP, string filename, string username, string password, bool ssl)
        {
            string str = "";
            try
            {
                MailMessage message = new MailMessage
                {
                    IsBodyHtml = false,
                    Subject = mailSubjct,
                    Body = mailBody,

                    From = new MailAddress(mailFrom)
                };
                for (int i = 0; i < mailAddress.Count; i++)
                {
                    message.To.Add(mailAddress[i]);
                }
                if (System.IO.File.Exists(filename))
                {
                    message.Attachments.Add(new Attachment(filename));
                }
                SmtpClient client = new SmtpClient
                {
                    EnableSsl = ssl,
                    UseDefaultCredentials = false
                };
                NetworkCredential credential = new NetworkCredential(username, password);
                client.Credentials = credential;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.Host = HostIP;
                client.Port = 0x19;
                client.Send(message);
            }
            catch (Exception exception)
            {
                str = exception.Message;
            }
            return str;
        }

        /// <summary>
        /// 发送邮件
        /// </summary>
        /// <param name="mailSubjct"></param>
        /// <param name="mailBody"></param>
        /// <param name="mailFrom"></param>
        /// <param name="mailAddress"></param>
        /// <param name="HostIP"></param>
        /// <param name="port"></param>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="ssl"></param>
        /// <param name="replyTo"></param>
        /// <param name="sendOK"></param>
        /// <returns></returns>
        public static string sendMail(string mailSubjct, string mailBody, string mailFrom, List<string> mailAddress, string HostIP, int port, string username, string password, bool ssl, string replyTo, out bool sendOK)
        {
            sendOK = true;
            string str = "";
            try
            {
                MailMessage message = new MailMessage
                {
                    IsBodyHtml = false,
                    Subject = mailSubjct,
                    Body = mailBody,
                    From = new MailAddress(mailFrom)
                };
                if (replyTo != string.Empty)
                {
                    MailAddress address = new MailAddress(replyTo);
                    message.ReplyToList.Add(address);
                }
                Regex regex = new Regex(@"\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*");
                for (int i = 0; i < mailAddress.Count; i++)
                {
                    if (regex.IsMatch(mailAddress[i]))
                    {
                        message.To.Add(mailAddress[i]);
                    }
                }
                if (message.To.Count == 0)
                {
                    return string.Empty;
                }
                SmtpClient client = new SmtpClient
                {
                    EnableSsl = ssl,
                    UseDefaultCredentials = false
                };
                NetworkCredential credential = new NetworkCredential(username, password);
                client.Credentials = credential;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.Host = HostIP;
                client.Port = port;
                client.Send(message);
            }
            catch (Exception exception)
            {
                str = exception.Message;
                sendOK = false;
            }
            return str;
        }
        #endregion

        public class SendMailEx
        {
            public SendMailEx()
            {
                SmtpClient smtp = new SmtpClient();
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Host = "smtp.163.com";
                smtp.Credentials = new NetworkCredential("outofmemory", "**");
                MailMessage mm = new MailMessage();
                mm.From = new MailAddress("outofmemory@163.com", "无敌outofmemory测试");
                mm.To.Add("outofmemory@vip.qq.com");
                mm.Subject = "发送带图片邮件";
                string plainTextBody = "如果你邮件客户端不支持HTML格式，或者你切换到“普通文本”视图，将看到此内容";
                mm.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(plainTextBody, null, "text/plain"));
                ////HTML格式邮件的内容
                string htmlBodyContent = "如果你的看到<b>这个</b>， 说明你是在以 <span style=\"color:red\">HTML</span> 格式查看邮件<br><br>";
                htmlBodyContent += "<a href=\"http://outofmemory.cn/\">为程序员服务</a> <img src=\"cid:weblogo\">";   //注意此处嵌入的图片资源
                AlternateView htmlBody = AlternateView.CreateAlternateViewFromString(htmlBodyContent, null, "text/html");
                LinkedResource lrImage = new LinkedResource(@"d:\1.jpg", "image/gif");
                lrImage.ContentId = "weblogo"; //此处的ContentId 对应 htmlBodyContent 内容中的 cid: ，如果设置不正确，请不会显示图片
                htmlBody.LinkedResources.Add(lrImage);
                mm.AlternateViews.Add(htmlBody);
                ////要求回执的标志
                mm.Headers.Add("Disposition-Notification-To", "abc@163.com");
                ////自定义邮件头
                mm.Headers.Add("X-Website", "http://outofmemory.cn/");
                ////针对 LOTUS DOMINO SERVER，插入回执头
                mm.Headers.Add("ReturnReceipt", "1");
                mm.Priority = MailPriority.Normal; //优先级
                mm.ReplyToList.Add(new MailAddress("outofmemory@163.com", "我自己"));
                ////如果发送失败，SMTP 服务器将发送 失败邮件告诉我
                mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                ////异步发送完成时的处理事件
                smtp.SendCompleted += new SendCompletedEventHandler(smtp_SendCompleted);
                ////开始异步发送
                smtp.SendAsync(mm, null);
            }
            void smtp_SendCompleted(object sender, System.ComponentModel.AsyncCompletedEventArgs e)
            {
                if (e.Cancelled)

                {

                    MailErr erro = new MailErr() { state = "Erro", massge = "发送取消！" };

                }

                else

                {

                    if (e.Error == null)

                    {

                        MailErr erro = new MailErr() { state = "OK", massge = "发送成功！" };

                    }

                    else

                    {
                        MailErr erro = new MailErr() { state = "Erro", code = 205404, massge = e.Error.Message };
                    }

                }

            }
            class MailErr
            {
                public string state { get; set; }
                public int code { get; set; }
                public string massge { get; set; }
            }
        }
    }
}
