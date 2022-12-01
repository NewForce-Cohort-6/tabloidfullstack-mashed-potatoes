import React from 'react';

const baseUrl = '/api/Subscription';

export const getAllSubscriptions = () => {
    return fetch(baseUrl)
        .then((res) => res.json())
};

export const addSubscription = (subscription) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      })
};