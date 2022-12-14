package boco.controller.model;

import boco.model.http.ContactRequest;
import boco.service.profile.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {
    private final EmailService emailService;

    @Autowired
    public ContactController(EmailService emailService){
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<?> sendContactMail(@RequestBody ContactRequest contactRequest){
        emailService.sendContactFormFromUser(contactRequest.getEmail(),
                contactRequest.getName(), contactRequest.getIssue());
            return new ResponseEntity<>(HttpStatus.OK);
    }

}
