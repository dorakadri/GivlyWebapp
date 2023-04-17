const express = require("express");
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://jamaity.org/associations'
const AssoRoutes = express.Router();

AssoRoutes.get('/', function (req, res) {
    res.json('This is my webscraper')
  })


  const articles = []

  AssoRoutes.get('/results', (req, res) => {
    const filteredData = articles.filter(obj => obj.title.trim() !== '' &&  obj.imgSrc.trim() !== '');
    res.json(filteredData)
  
  })
  axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
  
  
  
    // $('.h4', html).each(function () { //<-- cannot be a function expression
    //     const title = $(this).text()
    //     const url = $(this).find('a').attr('href')
    //     articles.push({
    //         title,
    //         url,
    //     })
    // })
    $('div.panel').each(function () {
        const href = $(this).find('a.text-left').attr('href');
        const title = $(this).find('a.text-left').text();
        const imgSrc = $(this).find('img').attr('src');
        articles.push({
            href, title, imgSrc
        })
    });
  
  }).catch(err => console.log(err))
  const secondUrl = 'https://jamaity.org/associations/page/2';
  axios(secondUrl).then(result => {
        const html = result.data;
        const $ = cheerio.load(html);
  
        // Scrape the information from the second page using Cheerio
        $('div.panel').each(function () {
            const href = $(this).find('a.text-left').attr('href');
            const title = $(this).find('a.text-left').text();
            const imgSrc = $(this).find('img').attr('src');
            articles.push({
                title,
                href, 
                imgSrc
            });
        });
    })
  
  const ThirdUrl = 'https://jamaity.org/associations/page/3';
  axios(ThirdUrl).then(result => {
        const html = result.data;
        const $ = cheerio.load(html);
  
        // Scrape the information from the second page using Cheerio
        $('div.panel').each(function () {
            const href = $(this).find('a.text-left').attr('href');
            const title = $(this).find('a.text-left').text();
            const imgSrc = $(this).find('img').attr('src');
            articles.push({
                title,
                href, 
                imgSrc
            });
        });
    })
  
  
    const FourthUrl = 'https://jamaity.org/associations/page/4';
  axios(FourthUrl).then(result => {
        const html = result.data;
        const $ = cheerio.load(html);
  
        // Scrape the information from the second page using Cheerio
        $('div.panel').each(function () {
            const href = $(this).find('a.text-left').attr('href');
            const title = $(this).find('a.text-left').text();
            const imgSrc = $(this).find('img').attr('src');
            articles.push({
                title,
                href, 
                imgSrc
            });
        });
    })
  
  
  const FifthUrl = 'https://jamaity.org/associations/page/5';
  axios(FifthUrl).then(result => {
        const html = result.data;
        const $ = cheerio.load(html);
  
        // Scrape the information from the second page using Cheerio
        $('div.panel').each(function () {
            const href = $(this).find('a.text-left').attr('href');
            const title = $(this).find('a.text-left').text();
            const imgSrc = $(this).find('img').attr('src');
            articles.push({
                title,
                href, 
                imgSrc
            });
        });
    })
    const SixthUrl = 'https://jamaity.org/associations/page/6';
    axios(SixthUrl).then(result => {
            const html = result.data;
            const $ = cheerio.load(html);
    
            // Scrape the information from the second page using Cheerio
            $('div.panel').each(function () {
                const href = $(this).find('a.text-left').attr('href');
                const title = $(this).find('a.text-left').text();
                const imgSrc = $(this).find('img').attr('src');
                articles.push({
                    title,
                    href, 
                    imgSrc
                });
            });
        })
  
        const Sevenurl = 'https://jamaity.org/associations/page/7';
        axios(Sevenurl).then(result => {
                const html = result.data;
                const $ = cheerio.load(html);
        
                // Scrape the information from the second page using Cheerio
                $('div.panel').each(function () {
                    const href = $(this).find('a.text-left').attr('href');
                    const title = $(this).find('a.text-left').text();
                    const imgSrc = $(this).find('img').attr('src');
                    articles.push({
                        title,
                        href, 
                        imgSrc
                    });
                });
            })
    
            const Eighturl = 'https://jamaity.org/associations/page/8';
        axios(Eighturl).then(result => {
                const html = result.data;
                const $ = cheerio.load(html);
        
                // Scrape the information from the second page using Cheerio
                $('div.panel').each(function () {
                    const href = $(this).find('a.text-left').attr('href');
                    const title = $(this).find('a.text-left').text();
                    const imgSrc = $(this).find('img').attr('src');
                    articles.push({
                        title,
                        href, 
                        imgSrc
                    });
                });
            })
            const Nineurl = 'https://jamaity.org/associations/page/9';
            axios(Nineurl).then(result => {
                    const html = result.data;
                    const $ = cheerio.load(html);
            
                    // Scrape the information from the second page using Cheerio
                    $('div.panel').each(function () {
                        const href = $(this).find('a.text-left').attr('href');
                        const title = $(this).find('a.text-left').text();
                        const imgSrc = $(this).find('img').attr('src');
                        articles.push({
                            title,
                            href, 
                            imgSrc
                        });
                    });
                })
  
                const Tenurl = 'https://jamaity.org/associations/page/10';
                axios(Tenurl).then(result => {
                        const html = result.data;
                        const $ = cheerio.load(html);
                
                        // Scrape the information from the second page using Cheerio
                        $('div.panel').each(function () {
                            const href = $(this).find('a.text-left').attr('href');
                            const title = $(this).find('a.text-left').text();
                            const imgSrc = $(this).find('img').attr('src');
                            articles.push({
                                title,
                                href, 
                                imgSrc
                            });
                        });
                    })

module.exports = AssoRoutes;