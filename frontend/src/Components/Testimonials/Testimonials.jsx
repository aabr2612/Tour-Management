import React from 'react'
import Slider from 'react-slick'
import ava01 from "../../assets/images/ava-1.jpg"
import ava02 from "../../assets/images/ava-2.jpg"
import ava03 from "../../assets/images/ava-3.jpg"

const Testimonials = () => {

    const settings = {
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint: 992,
                settings:{
                    slidesToShow:2,
                    slideToScroll:1,
                    dots:true,
                    infinite:true,
                },
            },
            {
                breakpoint:576,
                settings: {
                    slidesToShow:1,
                    slideToScroll:2,
                },
            }
        ]
    }

  return (
    <Slider {...settings}>
        <div className="testimonials py-4 px-3">
            <p>I had an exceptional experience with this service. The team was incredibly professional and attentive, and they exceeded my expectations in every way. Highly recommended!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className="w-25 h-25 rounded-2" alt="John Doe" />
                <div>
                    <h6 className="mb-0 mt-3">John Doe</h6>
                    <p>Satisfied Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonials py-4 px-3">
            <p>From start to finish, the process was smooth and efficient. The results were fantastic, and I couldn't be happier with the outcome. The attention to detail was impressive!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className="w-25 h-25 rounded-2" alt="Lia Frank" />
                <div>
                    <h6 className="mb-0 mt-3">Lia Frank</h6>
                    <p>Delighted Client</p>
                </div>
            </div>
        </div>
        <div className="testimonials py-4 px-3">
            <p>Exceptional quality and service. The team was very responsive and provided clear communication throughout. I am thoroughly impressed with their work and would use their services again!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava03} className="w-25 h-25 rounded-2" alt="Stefan Hawking" />
                <div>
                    <h6 className="mb-0 mt-3">Stefan Hawking</h6>
                    <p>Happy Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonials py-4 px-3">
            <p>Great experience from beginning to end. The service was top-notch, and the end result exceeded my expectations. The team’s expertise and dedication were evident throughout.</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava01} className="w-25 h-25 rounded-2" alt="John Doe" />
                <div>
                    <h6 className="mb-0 mt-3">John Doe</h6>
                    <p>Satisfied Customer</p>
                </div>
            </div>
        </div>
        <div className="testimonials py-4 px-3">
            <p>I couldn’t be more pleased with the service. The team was professional, timely, and went above and beyond to ensure everything was perfect. Highly recommend their services!</p>

            <div className="d-flex align-items-center gap-4 mt-3">
                <img src={ava02} className="w-25 h-25 rounded-2" alt="Lia Frank" />
                <div>
                    <h6 className="mb-0 mt-3">Lia Frank</h6>
                    <p>Delighted Client</p>
                </div>
            </div>
        </div>
    </Slider>
  )
}

export default Testimonials