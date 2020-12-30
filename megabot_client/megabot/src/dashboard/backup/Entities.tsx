import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const Entities: FC = () => {
    return (
        <Card style={{ height: 200 }}>
            <CardContent>
                <Typography className="card-title" color="textSecondary" gutterBottom>
                    Entities
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Entities;
