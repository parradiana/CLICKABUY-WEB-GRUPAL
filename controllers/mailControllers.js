const nodemailer = require('nodemailer')

let transport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PWD
    },
    tls: {
        rejectUnauthorized: false
    }
})
const mailControllers = {
    mailOrderConfirmed: async (req, res) => {
        console.log(req.body)
        const { person, resumen, destinatario, asunto, total } = req.body
        let mailOptions = {
            from: 'Order Confirmation!  <nocontestar@donotreply.com>',
            to: destinatario,
            subject: asunto,
            html: productos()
        }
        transport.sendMail(mailOptions, (err) => {
            if (err) console.log(err)
            res.json({ success: true })
        })
        function productos() {
            var html = `<div style="display: flex; justify-content: center; width: 100%; font-family: 'Poppins', sans-serif;">
            <div style="display:flex; width: 100%; flex-direction: column; align-items: center;">
                <div>
                    <div style="display: flex; align-items: center;">
                        <div style="background-image: url('https://webdesing881317710.files.wordpress.com/2021/06/tags-solid.png'); width: 4vw; height: 5vh; background-position: center; background-size: contain; background-repeat: no-repeat;"></div>
                        <h1>clickabuy</h1>
                    </div>
                    <div style="background-image: url('https://webdesing881317710.files.wordpress.com/2021/06/delivery-checklist-3621861-3081404.png'); width: 40vw; height: 40vh; background-position: center; background-size: contain; background-repeat: no-repeat;"></div>
                    <span style="font-family:'Poppins-Regular', sans-serif;">Hey </span><span style="font-weight: bold;">${person}!,</span>
                    <div style="display: flex; align-items: center;">
                        <h3 style="color: #EA957F;">Your order is confirmed</h3>
                    </div>
                    <p style="font-family:'Poppins-Regular', sans-serif;">Thanks for shopping in clickabuy! You can find your purchase information below.</p>
                    <div style="margin-top: 6vh;">
                        <h3 style="margin: 0;">Order Summary</h3>
                        <div style="background-color: black; height: 4px; width: 6vw; display: flex; justify-content: center;"></div>
                        
                        
                        

                        <div style="display: flex; flex-direction: column; align-items: flex-end;">
                        <p style="font-weight: bold;">Total : $ precio total</p>
                        <div style="display: flex; align-items: center;">
                            <p style="font-weight: bold;">Shipping :  FREE</p>
                        </div>
                        <div style="display: flex; align-items: center;">
                            <h3>Order Total : </h3><span style="font-weight: bold;">Total : $ precio total</span>
                        </div>
                        </div>
                        `
            resumen.map(product => html += `
                    <div style="border-bottom: 1px solid #e6e6e6; display: flex; align-items: center; justify-content: space-between;">
                        <div style="background-image: url('${product.product.imageProduct}');background-position: center;
                        background-size: cover; 
                        background-repeat: no-repeat;
                        width: 18vw;
                        height: 36vh;"></div>
                        <span style="font-weight: bold;">${product.product.nameProduct}</span>
                        <span style="font-family:'Poppins-Regular', sans-serif;"> QTY : ${product.product.quantity}</span>
                        <p>$ ${product.product.priceProduct}</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
            `)
            return html
        }
    },

}
module.exports = mailControllers