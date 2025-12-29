package com.eshop.service;

import com.eshop.entity.Order;
import com.eshop.entity.OrderItem;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@lombok.extern.slf4j.Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendWelcomeEmail(String to, String name) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("noreply@eshop.com");
            helper.setTo(to);
            helper.setSubject("Vitajte v našom E-shope!");

            String htmlContent = "<html><body>"
                    + "<h1>Vitajte, " + name + "!</h1>"
                    + "<p>Ďakujeme za vašu registráciu v našom e-shope.</p>"
                    + "<p>Teraz môžete pohodlne nakupovať a sledovať svoje objednávky.</p>"
                    + "<br/>"
                    + "<p>S pozdravom,<br/>Tím Eshop</p>"
                    + "</body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Welcome email sent to {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send welcome email to {}", to, e);
        }
    }

    @Async
    public void sendOrderConfirmationEmail(Order order) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("noreply@eshop.com");
            helper.setTo(order.getEmail());
            helper.setSubject("Potvrdenie objednávky č. " + order.getId());

            StringBuilder itemsHtml = new StringBuilder();
            itemsHtml.append("<table style='width: 100%; border-collapse: collapse;'>");
            itemsHtml.append(
                    "<tr style='background-color: #f2f2f2;'><th style='padding: 8px; text-align: left;'>Produkt</th><th style='padding: 8px; text-align: center;'>Množstvo</th><th style='padding: 8px; text-align: right;'>Cena</th></tr>");

            for (OrderItem item : order.getItems()) {
                String imgHtml = "";
                if (item.getImage() != null && !item.getImage().isEmpty()) {
                    String imgUrl = item.getImage();
                    // Resolve relative URLs to full localhost URL for email context
                    if (!imgUrl.startsWith("http")) {
                        imgUrl = "http://localhost:8081" + imgUrl;
                    }
                    imgHtml = "<img src='" + imgUrl
                            + "' alt='img' width='50' height='50' style='width: 50px; height: 50px; object-fit: cover; margin-right: 10px; vertical-align: middle;' />";
                }

                itemsHtml.append("<tr>");
                itemsHtml.append("<td style='padding: 8px; border-bottom: 1px solid #ddd;'>")
                        .append(imgHtml)
                        .append(item.getName()) // Should actully be item.getProductName() but entity has name? Let's
                                                // check. Entity has 'name'.
                        .append("</td>");
                itemsHtml.append("<td style='padding: 8px; text-align: center; border-bottom: 1px solid #ddd;'>")
                        .append(item.getQuantity())
                        .append("</td>");
                itemsHtml.append("<td style='padding: 8px; text-align: right; border-bottom: 1px solid #ddd;'>")
                        .append(String.format("%.2f €", item.getPrice() * item.getQuantity()))
                        .append("</td>");
                itemsHtml.append("</tr>");
            }
            itemsHtml.append("</table>");

            String htmlContent = "<html><body style='font-family: Arial, sans-serif;'>"
                    + "<h2>Ďakujeme za vašu objednávku č. " + order.getId() + "</h2>"
                    + "<p>Dobrý deň " + order.getCustomerName() + ",</p>"
                    + "<p>Vašu objednávku sme úspešne prijali a spracovávame ju.</p>"

                    + "<h3>Kde doručíme tovar:</h3>"
                    + "<p>" + order.getStreet() + "<br/>"
                    + order.getZip() + " " + order.getCity() + "<br/>"
                    + order.getCountry() + "</p>"

                    + "<h3>Zoznam produktov:</h3>"
                    + itemsHtml.toString()

                    + "<h3 style='text-align: right;'>Celkom k úhrade: " + String.format("%.2f €", order.getTotal())
                    + "</h3>"

                    + "<p>Spôsob dopravy: " + order.getShippingMethod() + "</p>"
                    + "<p>Spôsob platby: " + order.getPaymentMethod() + "</p>"

                    + "<br/><p>S pozdravom,<br/>Tím Eshop</p>"
                    + "</body></html>";

            helper.setText(htmlContent, true);
            mailSender.send(message);
            log.info("Order confirmation email sent to {}", order.getEmail());
        } catch (MessagingException e) {
            log.error("Failed to send order confirmation email to {}", order.getEmail(), e);
        }
    }
}
