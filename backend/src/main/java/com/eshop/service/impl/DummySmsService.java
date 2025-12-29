package com.eshop.service.impl;

import com.eshop.service.SmsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class DummySmsService implements SmsService {

    @Override
    public void sendSms(String phoneNumber, String message) {
        if (phoneNumber == null || phoneNumber.isEmpty()) {
            log.warn("Cannot send SMS: Phone number is empty.");
            return;
        }

        // Simulation of sending SMS
        // In real world, here would be Twilio or other provider API call
        log.info("-------------------- SMS --------------------");
        log.info("To: {}", phoneNumber);
        log.info("Message: {}", message);
        log.info("---------------------------------------------");
    }
}
