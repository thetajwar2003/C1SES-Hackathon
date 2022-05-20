import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { m } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { CardContent, Box, Card, Typography, Link } from '@mui/material';

// components
import { MotionContainer, varFade } from '../animate';
import { CarouselDots, CarouselArrows } from '../carousel';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 8,
    position: 'absolute',
    backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------


const _appFeatured = [...Array(3)].map((_, index) => ({
    id: index,
    title: ['Harry Potter and the Deathly Hallows - Part 2', 'Disney Zombies 2', 'Lightroom mobile - Koloro'][index],
    description: 'Title',
    image: 'https://picsum.photos/id/237/200/300',
}));


export default function News({ apiKey }) {
    const theme = useTheme();
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? _appFeatured.length - 1 : 0);
    const [data, setData] = useState([]);


    useEffect(async () => {
        try {
            const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${ apiKey }`);
            const json = await res.json();
            const data = json.articles;
            console.log(data);
            setData(data);
        } catch (error) {
            console.log(error);
        }
        return () => {
            console.log('This will be logged on unmount');
        };
    }, []);


    const settings = {
        speed: 800,
        dots: true,
        arrows: false,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rtl: Boolean(theme.direction === 'rtl'),
        beforeChange: (current, next) => setCurrentIndex(next),
        ...CarouselDots({
            zIndex: 9,
            top: 24,
            left: 24,
            position: 'absolute',
        }),
    };

    const handlePrevious = () => {
        carouselRef.current.slickPrev();
    };

    const handleNext = () => {
        carouselRef.current.slickNext();
    };

    return (
        <Card>
            <Slider ref={carouselRef} {...settings}>
                {data.map((news, index) => (
                    <CarouselItem key={index} item={news} isActive={index === currentIndex} />
                ))}
            </Slider>

            <CarouselArrows
                onNext={handleNext}
                onPrevious={handlePrevious}
                spacing={0}
                sx={{
                    top: 16,
                    right: 16,
                    position: 'absolute',
                    '& .arrow': {
                        p: 0,
                        width: 32,
                        height: 32,
                        opacity: 0.48,
                        color: 'common.white',
                        '&:hover': { color: 'common.white', opacity: 1 },
                    },
                }}
            />
        </Card>
    );
}

// ----------------------------------------------------------------------

function CarouselItem({ item, isActive }) {
    const { urlToImage, title, author, url } = item;
    console.log(item);
    return (
        <Box sx={{ position: 'relative' }}>
            <CardContent
                component={MotionContainer}
                animate={isActive}
                action
                sx={{
                    bottom: 0,
                    width: 1,
                    zIndex: 9,
                    textAlign: 'left',
                    position: 'absolute',
                    color: 'common.white',
                }}
            >
                <m.div variants={varFade().inRight}>
                    <Typography variant="overline" component="div" sx={{ mb: 1, opacity: 0.48 }}>
                        Featured App
                    </Typography>
                </m.div>
                <m.div variants={varFade().inRight}>
                    <a href={url} target="_blank">
                        <Typography variant="h5" gutterBottom noWrap>
                            {title}
                        </Typography>
                    </a>
                </m.div>
                <m.div variants={varFade().inRight}>
                    <Typography variant="body2" noWrap>
                        {author}
                    </Typography>
                </m.div>
            </CardContent>
            <OverlayStyle />
            <img alt={title} src={urlToImage} style={{ height: { xs: 280, xl: 320 } }} />
        </Box>
    );
}
