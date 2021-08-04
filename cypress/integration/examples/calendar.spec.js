
/// <reference types="Cypress"/>

import homePage from '../pageObjects/homePage'
const loginData = require('../../fixtures/loginData')

context('Calendar Functionalities', () => {
    before(() => {
        cy.visit('http://app.gohighlevel.com/')
        //I have just done the below to show page objects classes.I havent done it for all the pages only for login.But can be done for all the pages
        const HomePage = new homePage
        HomePage.getEmail().type(loginData.email)  // The email and passwork is loading from loginData json file.
        HomePage.getpassword().type(loginData.password)
        HomePage.getSignin().click()
        cy.wait(15000)


    })

    describe('Booking widget deatails', () => {
        it('should verify the clicking link will lead to teams calendar', () => {
            //First we have to go to the setting and then to calendar
            cy.get('#nav-settings').click()
            cy.get('.hl_settings--nav > :nth-child(12) > a').click();
            cy.get('#card_view_container').find('div.card.card--provider').each(($rl, index, $list) => {
                const cardTitle = $rl.find('span.title').text();
                if (cardTitle.includes('Enrolling')) {
                    const CalendarLink = $rl.find('.card-body > .card--service > .card-header > :nth-child(5) > .btn')
                    expect(CalendarLink).to.exist
                    const linkText = CalendarLink.text();
                    expect(linkText).to.equal(' /enrolling/quicksetuptest ') // assertion to verify if the link shown is correct.
                    CalendarLink.trigger('click')
                    //Cant veryfy the navigation through link as cypress doesnot allow multiTab testing
                }

            })

        })

    })
    describe('Edit Availablity', () => {
        before(() => {
            //First we have to go to the setting and then to calendar
            cy.get('#nav-settings').click();
            cy.get('.hl_settings--nav > :nth-child(12) > a').click();
            //The below codes could have written in support > commands file but I thought it will be easier for you to read the codes if I write it here.
            cy.get('#card_view_container').find('div.card.card--provider').each(($rl, index, $list) => {
                const cardTitle = $rl.find('span.title').text();
                if (cardTitle.includes('Enrolling')) {

                    $rl.find('i.icon-ellipsis').trigger("click");
                    cy.get('#pg-team-cal__button--edit-calendar').click();
                    cy.wait(5000);
                }
                //The above code is reusable for n number of card providers 
                //Now we have to go to the edit moadal and select availablity tab
            })
            cy.get('.step-2 > .icon-wrapper').click();

        })
        beforeEach(() => {
            //Since there was no test data name or class or unique id so I have to use parents child Binding

            cy.get('section').eq(0).find(':nth-child(4) > :nth-child(1) > .form-group > div').as('aptPerSlot');
            cy.get('section').eq(0).find(':nth-child(4) > :nth-child(2) > .form-group > div').as('aptPerDay');
        })


        it('should verify presence of required fields in availablity tab', () => {
            cy.get('@aptPerSlot').should('be.visible');
            cy.get('@aptPerDay').should('be.visible');
        })

        it('should verify that user is able to enter only numbers for fields', () => {
            //for appointment per slot
            cy.get('@aptPerSlot').find('input').type('Arona');
            cy.get('@aptPerSlot').find('input').should('not.have.text', 'Arona')//assertion for invalid input

            cy.get('@aptPerSlot').find('input').type('{backspace}1234');
            cy.get('@aptPerSlot').find('input').should('have.value', '1234') //assertion for valid input
            //for appointment per Day
            cy.get('@aptPerDay').find('input').type('Aloha');
            cy.get('@aptPerDay').find('input').should('not.have.text', 'Aloha')//assertion for invalid input

            cy.get('@aptPerDay').find('input').type('{backspace}5678');
            cy.get('@aptPerDay').find('input').should('have.value', '5678') //assertion for valid input

        })

        xit('should verify that tooltip is visible on hover over', () => {
            cy.get('@aptPerDay').find('label > span > i.fas').trigger('mouseover');
            cy.get('@aptPerSlot').find('label > span ').trigger('click').should('have.attr', 'data-original-title');
            //I tried running it but this hover functionsality is not working while running test automation
            cy.get('@aptPerDay').find('label > span > i.fas').trigger('mouseover');


        })
    })




})