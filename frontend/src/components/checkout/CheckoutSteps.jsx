import React from 'react';
import { ShoppingCart, User, Truck, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Checkout.css';

const CheckoutSteps = ({ currentStep }) => {
    const steps = [
        { number: 1, title: 'Košík', icon: <ShoppingCart size={20} />, link: '/cart' },
        { number: 2, title: 'Dodacie údaje', icon: <User size={20} />, link: '/checkout/info' },
        { number: 3, title: 'Doprava a platba', icon: <Truck size={20} />, link: '/checkout/shipping' },
        { number: 4, title: 'Hotovo', icon: <CheckCircle size={20} />, link: null }
    ];

    return (
        <div className="checkout-steps">
            {steps.map((step, index) => {
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;

                return (
                    <div key={step.number} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                        <div className="step-icon">
                            {step.icon}
                        </div>
                        <span className="step-title">{step.title}</span>
                        {index < steps.length - 1 && <div className="step-line"></div>}
                    </div>
                );
            })}
        </div>
    );
};

export default CheckoutSteps;
