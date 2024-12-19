const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
    try {
        console.log('Received form data:', req.body); // Debug log

        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            subject: req.body.subject,
            message: req.body.message
        });

        const savedContact = await contact.save();
        console.log('Saved to database:', savedContact); // Debug log

        res.status(200).json({ 
            success: true, 
            message: 'Thank you for your message. We will contact you soon!' 
        });

    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'There was an error submitting your message. Please try again.' 
        });
    }
}; 