import React, { FC, useEffect, useState } from 'react';
import { Avatar, Typography } from 'antd';
import smartCardDataHelper, { SC006Data } from '../types';
import Moment from 'react-moment';
import 'moment/locale/ko';
import 'moment/locale/vi';
const { Text } = Typography;

interface Prods {
    data: SC006Data;
    className?: string;
}

/**
 * Today weather
 * https://www.iconfinder.com/icons/4102314/cloud_cloudy_sun_sunny_weather_icon
 * @param prods
 * @constructor
 */
const SC006: FC<Prods> = (prods: Prods) => {
    const [data, setData] = useState();

    useEffect(() => {
        const values = smartCardDataHelper.getTextItemValues(prods.data);
        setData(values);
        // console.log('SC006.tsx', values);
    }, [prods.data]);

    if (!data) return null;

    return (
        <div className={`sc006 ${prods.className ? prods.className : ''}`}>
            <div className="location-area">
                <Text className="location">{data.location ? data.location : 'Location'}</Text>
                {data.time && (
                    <Moment className="time" element={Text} format="ddd, MMM DD, YYYY" locale="KO">
                        {data.time}
                    </Moment>
                )}
                <Text className="summary">{data.summary ? data.summary : ''}</Text>
            </div>
            <div className="icon-area">
                <Avatar
                    style={{ backgroundColor: 'transparent' }}
                    shape="square"
                    src={smartCardDataHelper.getWeatherIcon(data)}
                    size={80}
                    icon={<Avatar size={80} src={smartCardDataHelper.defaultWeatherIcon()} />}
                />
            </div>
            <div className="temperature-area">
                <Text className="current">{data.currentTemperature ? data.currentTemperature : '0'}°F</Text>
            </div>
            <div className="left-area">
                <div className="humidity">
                    <Avatar
                        className="icon"
                        size={16}
                        src={process.env.PUBLIC_URL + '/icon/weather/water-percent.svg'}
                    />
                    <span>{data.humidity ? data.humidity * 100 : '0'} %</span>
                </div>
                <Text className="windSpeed">
                    <Avatar
                        className="icon"
                        size={16}
                        src={process.env.PUBLIC_URL + '/icon/weather/weather-windy.svg'}
                    />
                    <span>{data.windSpeed ? data.windSpeed : '0'} miles/h</span>
                </Text>
            </div>
            <div className="right-area">
                <div className="visibility">
                    <Avatar className="icon" size={16} src={process.env.PUBLIC_URL + '/icon/weather/weather-fog.svg'} />
                    <span>{data.visibility ? data.visibility : '0'} miles</span>
                </div>
                <div className="pressure">
                    <Avatar className="icon" size={16} src={process.env.PUBLIC_URL + '/icon/weather/gauge.svg'} />
                    <span>{data.pressure ? data.pressure : '0'} mbar</span>
                </div>
            </div>
        </div>
    );
};

export default SC006;
