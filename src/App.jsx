import './App.css';
import PlotComponent from './components/PlotComponent';
import { useState } from 'react'; // Added missing import
import sentimentScatterData from './sentiment_scatter.json'; // Adjust path as needed
import sentimentTrendData from './sentiment_trend.json'; // Adjust path as needed

// Sample time series data for different subreddits
const conservative_frequency = [{ "created_date": "2025-02-11T00:00:00.000", "num_posts": 74 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 199 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 190 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 147 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 105 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 107 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 126 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 32 }];
const democrats_frequency = [{ "created_date": "2025-01-23T00:00:00.000", "num_posts": 19 }, { "created_date": "2025-01-24T00:00:00.000", "num_posts": 27 }, { "created_date": "2025-01-25T00:00:00.000", "num_posts": 22 }, { "created_date": "2025-01-26T00:00:00.000", "num_posts": 30 }, { "created_date": "2025-01-27T00:00:00.000", "num_posts": 26 }, { "created_date": "2025-01-28T00:00:00.000", "num_posts": 37 }, { "created_date": "2025-01-29T00:00:00.000", "num_posts": 49 }, { "created_date": "2025-01-30T00:00:00.000", "num_posts": 52 }, { "created_date": "2025-01-31T00:00:00.000", "num_posts": 34 }, { "created_date": "2025-02-01T00:00:00.000", "num_posts": 47 }, { "created_date": "2025-02-02T00:00:00.000", "num_posts": 41 }, { "created_date": "2025-02-03T00:00:00.000", "num_posts": 41 }, { "created_date": "2025-02-04T00:00:00.000", "num_posts": 43 }, { "created_date": "2025-02-05T00:00:00.000", "num_posts": 39 }, { "created_date": "2025-02-06T00:00:00.000", "num_posts": 40 }, { "created_date": "2025-02-07T00:00:00.000", "num_posts": 32 }, { "created_date": "2025-02-08T00:00:00.000", "num_posts": 38 }, { "created_date": "2025-02-09T00:00:00.000", "num_posts": 32 }, { "created_date": "2025-02-10T00:00:00.000", "num_posts": 36 }, { "created_date": "2025-02-11T00:00:00.000", "num_posts": 30 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 34 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 32 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 40 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 34 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 34 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 33 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 10 }];
const liberal_frequency = [{ "created_date": "2024-07-23T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-07-24T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-07-25T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-07-26T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-07-27T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-07-28T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-07-29T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-07-30T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-07-31T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-08-01T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-08-02T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-08-03T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-04T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-08-05T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-08-06T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-08-07T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-08-08T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-08-09T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-08-10T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-08-11T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-08-12T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-13T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-14T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-15T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-08-16T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-17T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-08-18T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-08-19T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-08-20T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-21T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-22T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-08-23T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-08-24T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-25T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-08-26T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-27T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-28T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-29T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-08-30T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-08-31T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-09-01T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-09-02T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-09-03T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-09-04T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-09-05T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-09-06T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-09-07T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-09-08T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-09-09T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-09-10T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-09-11T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-09-12T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-09-13T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-09-14T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-09-15T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-09-16T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-09-17T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-09-18T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-09-19T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-09-20T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-09-21T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-09-22T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-09-23T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-09-24T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-09-25T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-09-26T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-09-27T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-09-28T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-09-29T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-09-30T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-01T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-10-02T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-03T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-10-04T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-05T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-06T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-10-07T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-10-08T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-09T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-10T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-11T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-12T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-10-13T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-10-14T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-10-15T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-16T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-10-17T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-10-18T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-10-19T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-20T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-10-21T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-22T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-23T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-10-24T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-10-25T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-10-26T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-27T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-10-28T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-10-29T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-10-30T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-10-31T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-01T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-02T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-11-03T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-11-04T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-05T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-11-06T00:00:00.000", "num_posts": 21 }, { "created_date": "2024-11-07T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-11-08T00:00:00.000", "num_posts": 20 }, { "created_date": "2024-11-09T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-10T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-11T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-12T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-13T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-14T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-11-15T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-11-16T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-17T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-11-18T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-19T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-11-20T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-21T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-11-22T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-23T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-24T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-11-25T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-11-26T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-11-27T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-11-28T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-11-29T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-30T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-12-01T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-12-02T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-12-03T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-04T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-12-05T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-06T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-12-07T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-12-08T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-12-09T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-12-10T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-12-11T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-12-12T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-12-13T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-12-14T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-12-15T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-12-16T00:00:00.000", "num_posts": 0 }, { "created_date": "2024-12-17T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-18T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-19T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-12-20T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-21T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-22T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-12-23T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-12-24T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-12-25T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-12-26T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-12-27T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-12-28T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-12-29T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-12-30T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-12-31T00:00:00.000", "num_posts": 4 }, { "created_date": "2025-01-01T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-01-02T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-01-03T00:00:00.000", "num_posts": 2 }, { "created_date": "2025-01-04T00:00:00.000", "num_posts": 1 }, { "created_date": "2025-01-05T00:00:00.000", "num_posts": 1 }, { "created_date": "2025-01-06T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-07T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-08T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-09T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-10T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-11T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-12T00:00:00.000", "num_posts": 4 }, { "created_date": "2025-01-13T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-14T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-15T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-16T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-17T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-01-18T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-01-19T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-20T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-21T00:00:00.000", "num_posts": 20 }, { "created_date": "2025-01-22T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-01-23T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-24T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-25T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-26T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-27T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-28T00:00:00.000", "num_posts": 15 }, { "created_date": "2025-01-29T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-30T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-31T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-02-01T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-02-02T00:00:00.000", "num_posts": 18 }, { "created_date": "2025-02-03T00:00:00.000", "num_posts": 30 }, { "created_date": "2025-02-04T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-02-05T00:00:00.000", "num_posts": 26 }, { "created_date": "2025-02-06T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-07T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-02-08T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-02-09T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-02-10T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-02-11T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 2 }];
const neoliberal_frequency = [{ "created_date": "2025-02-02T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-02-03T00:00:00.000", "num_posts": 100 }, { "created_date": "2025-02-04T00:00:00.000", "num_posts": 67 }, { "created_date": "2025-02-05T00:00:00.000", "num_posts": 76 }, { "created_date": "2025-02-06T00:00:00.000", "num_posts": 74 }, { "created_date": "2025-02-07T00:00:00.000", "num_posts": 64 }, { "created_date": "2025-02-08T00:00:00.000", "num_posts": 50 }, { "created_date": "2025-02-09T00:00:00.000", "num_posts": 43 }, { "created_date": "2025-02-10T00:00:00.000", "num_posts": 54 }, { "created_date": "2025-02-11T00:00:00.000", "num_posts": 70 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 77 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 72 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 63 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 57 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 47 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 55 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 21 }];
const politicaldiscussion_frequency = [{ "created_date": "2025-01-23T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-01-24T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-01-25T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-01-26T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-27T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-28T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-29T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-30T00:00:00.000", "num_posts": 2 }, { "created_date": "2025-01-31T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-02-01T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-02T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-03T00:00:00.000", "num_posts": 1 }, { "created_date": "2025-02-04T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-02-05T00:00:00.000", "num_posts": 1 }, { "created_date": "2025-02-06T00:00:00.000", "num_posts": 0 }, { "created_date": "2025-02-07T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-02-08T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-02-09T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-02-10T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-02-11T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 2 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 1 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 2 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 2 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 2 }];
const politics_frequency = [{ "created_date": "2025-02-14T00:00:00.000", "num_posts": 299 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 216 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 176 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 208 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 94 }];
const anarchism_frequency = [{ "created_date": "2024-11-07T00:00:00.000", "num_posts": 14 }, { "created_date": "2024-11-08T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-11-09T00:00:00.000", "num_posts": 13 }, { "created_date": "2024-11-10T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-11T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-11-12T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-11-13T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-11-14T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-11-15T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-11-16T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-17T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-11-18T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-19T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-11-20T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-11-21T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-11-22T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-11-23T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-11-24T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-11-25T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-26T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-11-27T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-28T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-29T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-30T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-12-01T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-12-02T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-03T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-04T00:00:00.000", "num_posts": 3 }, { "created_date": "2024-12-05T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-12-06T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-07T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-08T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-09T00:00:00.000", "num_posts": 19 }, { "created_date": "2024-12-10T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-11T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-12T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-12-13T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-14T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-15T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-16T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-12-17T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-18T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-12-19T00:00:00.000", "num_posts": 4 }, { "created_date": "2024-12-20T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-12-21T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-22T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-12-23T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-12-24T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-12-25T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-26T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-12-27T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-28T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-12-29T00:00:00.000", "num_posts": 14 }, { "created_date": "2024-12-30T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-31T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-01T00:00:00.000", "num_posts": 4 }, { "created_date": "2025-01-02T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-03T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-04T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-05T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-06T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-07T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-01-08T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-09T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-10T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-11T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-12T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-13T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-14T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-15T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-01-16T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-17T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-18T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-19T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-20T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-01-21T00:00:00.000", "num_posts": 16 }, { "created_date": "2025-01-22T00:00:00.000", "num_posts": 16 }, { "created_date": "2025-01-23T00:00:00.000", "num_posts": 15 }, { "created_date": "2025-01-24T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-25T00:00:00.000", "num_posts": 21 }, { "created_date": "2025-01-26T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-27T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-01-28T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-29T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-30T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-31T00:00:00.000", "num_posts": 18 }, { "created_date": "2025-02-01T00:00:00.000", "num_posts": 20 }, { "created_date": "2025-02-02T00:00:00.000", "num_posts": 15 }, { "created_date": "2025-02-03T00:00:00.000", "num_posts": 30 }, { "created_date": "2025-02-04T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-02-05T00:00:00.000", "num_posts": 18 }, { "created_date": "2025-02-06T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-02-07T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-02-08T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-09T00:00:00.000", "num_posts": 15 }, { "created_date": "2025-02-10T00:00:00.000", "num_posts": 14 }, { "created_date": "2025-02-11T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 14 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 1 }];
const socialism_frequency = [{ "created_date": "2024-12-30T00:00:00.000", "num_posts": 17 }, { "created_date": "2024-12-31T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-01-01T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-02T00:00:00.000", "num_posts": 24 }, { "created_date": "2025-01-03T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-01-04T00:00:00.000", "num_posts": 18 }, { "created_date": "2025-01-05T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-06T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-07T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-01-08T00:00:00.000", "num_posts": 19 }, { "created_date": "2025-01-09T00:00:00.000", "num_posts": 26 }, { "created_date": "2025-01-10T00:00:00.000", "num_posts": 23 }, { "created_date": "2025-01-11T00:00:00.000", "num_posts": 30 }, { "created_date": "2025-01-12T00:00:00.000", "num_posts": 20 }, { "created_date": "2025-01-13T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-01-14T00:00:00.000", "num_posts": 21 }, { "created_date": "2025-01-15T00:00:00.000", "num_posts": 16 }, { "created_date": "2025-01-16T00:00:00.000", "num_posts": 21 }, { "created_date": "2025-01-17T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-01-18T00:00:00.000", "num_posts": 21 }, { "created_date": "2025-01-19T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-01-20T00:00:00.000", "num_posts": 25 }, { "created_date": "2025-01-21T00:00:00.000", "num_posts": 20 }, { "created_date": "2025-01-22T00:00:00.000", "num_posts": 32 }, { "created_date": "2025-01-23T00:00:00.000", "num_posts": 19 }, { "created_date": "2025-01-24T00:00:00.000", "num_posts": 21 }, { "created_date": "2025-01-25T00:00:00.000", "num_posts": 28 }, { "created_date": "2025-01-26T00:00:00.000", "num_posts": 19 }, { "created_date": "2025-01-27T00:00:00.000", "num_posts": 22 }, { "created_date": "2025-01-28T00:00:00.000", "num_posts": 21 }, { "created_date": "2025-01-29T00:00:00.000", "num_posts": 32 }, { "created_date": "2025-01-30T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-01-31T00:00:00.000", "num_posts": 20 }, { "created_date": "2025-02-01T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-02-02T00:00:00.000", "num_posts": 21 }, { "created_date": "2025-02-03T00:00:00.000", "num_posts": 14 }, { "created_date": "2025-02-04T00:00:00.000", "num_posts": 16 }, { "created_date": "2025-02-05T00:00:00.000", "num_posts": 23 }, { "created_date": "2025-02-06T00:00:00.000", "num_posts": 20 }, { "created_date": "2025-02-07T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-02-08T00:00:00.000", "num_posts": 22 }, { "created_date": "2025-02-09T00:00:00.000", "num_posts": 19 }, { "created_date": "2025-02-10T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-02-11T00:00:00.000", "num_posts": 22 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 23 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 22 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 20 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 18 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 15 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 19 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 12 }];
const worldpolitics_frequency = [{ "created_date": "2024-11-12T00:00:00.000", "num_posts": 1 }, { "created_date": "2024-11-13T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-11-14T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-15T00:00:00.000", "num_posts": 5 }, { "created_date": "2024-11-16T00:00:00.000", "num_posts": 9 }, { "created_date": "2024-11-17T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-11-18T00:00:00.000", "num_posts": 17 }, { "created_date": "2024-11-19T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-11-20T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-11-21T00:00:00.000", "num_posts": 13 }, { "created_date": "2024-11-22T00:00:00.000", "num_posts": 6 }, { "created_date": "2024-11-23T00:00:00.000", "num_posts": 2 }, { "created_date": "2024-11-24T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-11-25T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-11-26T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-11-27T00:00:00.000", "num_posts": 13 }, { "created_date": "2024-11-28T00:00:00.000", "num_posts": 13 }, { "created_date": "2024-11-29T00:00:00.000", "num_posts": 13 }, { "created_date": "2024-11-30T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-12-01T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-12-02T00:00:00.000", "num_posts": 14 }, { "created_date": "2024-12-03T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-12-04T00:00:00.000", "num_posts": 15 }, { "created_date": "2024-12-05T00:00:00.000", "num_posts": 14 }, { "created_date": "2024-12-06T00:00:00.000", "num_posts": 14 }, { "created_date": "2024-12-07T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-12-08T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-12-09T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-10T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-11T00:00:00.000", "num_posts": 22 }, { "created_date": "2024-12-12T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-13T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-12-14T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-15T00:00:00.000", "num_posts": 14 }, { "created_date": "2024-12-16T00:00:00.000", "num_posts": 15 }, { "created_date": "2024-12-17T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-18T00:00:00.000", "num_posts": 13 }, { "created_date": "2024-12-19T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-12-20T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-12-21T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-22T00:00:00.000", "num_posts": 7 }, { "created_date": "2024-12-23T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-12-24T00:00:00.000", "num_posts": 10 }, { "created_date": "2024-12-25T00:00:00.000", "num_posts": 12 }, { "created_date": "2024-12-26T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-27T00:00:00.000", "num_posts": 15 }, { "created_date": "2024-12-28T00:00:00.000", "num_posts": 11 }, { "created_date": "2024-12-29T00:00:00.000", "num_posts": 8 }, { "created_date": "2024-12-30T00:00:00.000", "num_posts": 16 }, { "created_date": "2024-12-31T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-01T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-02T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-03T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-04T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-01-05T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-06T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-07T00:00:00.000", "num_posts": 15 }, { "created_date": "2025-01-08T00:00:00.000", "num_posts": 18 }, { "created_date": "2025-01-09T00:00:00.000", "num_posts": 4 }, { "created_date": "2025-01-10T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-11T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-12T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-13T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-14T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-15T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-01-16T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-17T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-01-18T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-01-19T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-01-20T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-01-21T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-22T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-23T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-24T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-25T00:00:00.000", "num_posts": 3 }, { "created_date": "2025-01-26T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-01-27T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-01-28T00:00:00.000", "num_posts": 4 }, { "created_date": "2025-01-29T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-01-30T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-01-31T00:00:00.000", "num_posts": 11 }, { "created_date": "2025-02-01T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-02T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-02-03T00:00:00.000", "num_posts": 4 }, { "created_date": "2025-02-04T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-02-05T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-02-06T00:00:00.000", "num_posts": 6 }, { "created_date": "2025-02-07T00:00:00.000", "num_posts": 9 }, { "created_date": "2025-02-08T00:00:00.000", "num_posts": 7 }, { "created_date": "2025-02-09T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-02-10T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-02-11T00:00:00.000", "num_posts": 5 }, { "created_date": "2025-02-12T00:00:00.000", "num_posts": 17 }, { "created_date": "2025-02-13T00:00:00.000", "num_posts": 12 }, { "created_date": "2025-02-14T00:00:00.000", "num_posts": 8 }, { "created_date": "2025-02-15T00:00:00.000", "num_posts": 10 }, { "created_date": "2025-02-16T00:00:00.000", "num_posts": 14 }, { "created_date": "2025-02-17T00:00:00.000", "num_posts": 13 }, { "created_date": "2025-02-18T00:00:00.000", "num_posts": 2 }];

const pieData = [
  {
    values: [
      3641, 124, 88, 1466, 96, 145, 94, 214, 100, 568, 196, 617, 116, 439, 113, 139, 140, 145, 279
    ],
    labels: [
      "Others", "apnews.com", "cnn.com", "i.redd.it", "nbcnews.com", "nytimes.com",
      "politico.com", "reddit.com", "reuters.com", "self.Anarchism", "self.Conservative",
      "self.Liberal", "self.PoliticalDiscussion", "self.socialism", "theguardian.com",
      "thehill.com", "v.redd.it", "youtu.be", "youtube.com"
    ],
    type: "pie"
  }
];

const subredditPieData = [
  {
    values: [
      974,
      980,
      984,
      123,
      853,
      932,
      993,
      993,
      984,
      989
    ],
    labels: [
      "Anarchism",
      "Conservative",
      "Liberal",
      "Others",
      "Republican",
      "democrats",
      "neoliberal",
      "politics",
      "socialism",
      "worldpolitics"
    ],
    type: "pie",
    hole: 0.7
  }
];

const layout = {
  font: {
    family: "Work Sans, sans-serif",
    size: 14,
    color: "#333333"
  },
  autosize: true,
  margin: { l: 0, r: 0, b: 100, t: 0 }
};



const subredditDataMap = {
  Anarchism: anarchism_frequency,
  Conservative: conservative_frequency,
  Liberal: liberal_frequency,
  Democrats: democrats_frequency,
  Neoliberal: neoliberal_frequency,
  PoliticalDiscussion: politicaldiscussion_frequency,
  Politics: politics_frequency,
  Socialism: socialism_frequency,
  Worldpolitics: worldpolitics_frequency
};

const subreddits = Object.keys(subredditDataMap);

const scatterTrace = {
  x: sentimentScatterData.map(d => d.created_date),
  y: sentimentScatterData.map(d => d.sentiment_score),
  mode: 'markers',
  type: 'scatter',
  name: 'Individual Posts',
  marker: {
    color: sentimentScatterData.map(d => (d.sentiment_label === 'POSITIVE' ? '#00CC96' : '#EF553B')),
    opacity: 0.5
  },
  text: sentimentScatterData.map(d => d.text),
  hovertemplate: 'Date: %{x}<br>Sentiment Score: %{y}<br>Text: %{text}<extra></extra>'
};

// Line plot trace for 7-day moving average
const trendTrace = {
  x: sentimentTrendData.map(d => d.created_date),
  y: sentimentTrendData.map(d => d.moving_avg),
  mode: 'lines',
  type: 'scatter',
  name: '7-Day Moving Average',
  line: { color: '#007bff' }
};

// Layout for the plot
const layoutSentiment = {
  xaxis: { title: 'Date' },
  yaxis: { title: 'Sentiment Score (-1 to 1)', range: [-1, 1] },
  showlegend: true,
  hovermode: 'closest',
  shapes: [
    {
      type: 'line',
      x0: sentimentTrendData[0].created_date,
      x1: sentimentTrendData[sentimentTrendData.length - 1].created_date,
      y0: 0,
      y1: 0,
      line: { color: 'black', dash: 'dash' }
    }
  ]
};


function App() {
  const [selectedSubreddit, setSelectedSubreddit] = useState(subreddits[0]);

  const selectedTimeSeriesData = subredditDataMap[selectedSubreddit];

  const timeSeriesLayout = {
    ...layout,
    title: `${selectedSubreddit} Subreddit: Daily Post Frequency Over Time`,
    xaxis: { title: "Date", tickangle: 0, showgrid: true },
    yaxis: { title: "Number of Posts", showgrid: true },
    template: "plotly_white"
  };

  // Error handling for debugging
  if (!selectedTimeSeriesData || !Array.isArray(selectedTimeSeriesData)) {
    console.error("Invalid time series data for", selectedSubreddit);
    return <div>Error: Invalid data for {selectedSubreddit}</div>;
  }

  return (
    <div className="grandparent-container">
      <div className='parent-container'>
        <h1>Story-Based Data Analysis</h1>
        <div className='plot-container'>
          <PlotComponent data={pieData} layout={layout} />
        </div>
        <div className='plot-container'>
          <PlotComponent data={subredditPieData} layout={layout} />
        </div>
        <div className="dropdown-container">
          <label htmlFor="subreddit-select">Select Subreddit: </label>
          <select
            id="subreddit-select"
            value={selectedSubreddit}
            onChange={(e) => setSelectedSubreddit(e.target.value)}
          >
            {subreddits.map((subreddit) => (
              <option key={subreddit} value={subreddit}>
                {subreddit}
              </option>
            ))}
          </select>
        </div>
        <div className='plot-container'>
          <PlotComponent
            data={[
              {
                x: selectedTimeSeriesData.map(d => d.created_date),
                y: selectedTimeSeriesData.map(d => d.num_posts),
                type: "scatter",
                mode: "lines",
                marker: { color: "#1BA9EA" }
              }
            ]}
            layout={timeSeriesLayout}
          />
        </div>

        <div className="plot-container">
          <PlotComponent data={[scatterTrace, trendTrace]} layout={layout} />
        </div>

        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam sint id dolorum?
        </div>
      </div>
    </div>
  );
}

export default App;