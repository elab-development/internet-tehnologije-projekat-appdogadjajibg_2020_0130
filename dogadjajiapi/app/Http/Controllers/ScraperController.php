<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\DomCrawler\Crawler;

class ScraperController extends Controller
{
    public function fetchEvents()
    {
        // Fetch the HTML content from the API
        $response = Http::withHeaders([
            'X-Api-Key' => 'cdBp5C7hVS7gbjOonMGK5KRnvweJwu3ie2B5TQAt'
        ])->get('https://api.api-ninjas.com/v1/webscraper?url=https://allevents.in/belgrade/all');

        if ($response->successful()) {
            $htmlContent = $response->json()['data']; // assuming the API response has 'html_content' field

            // Initialize the Crawler instance and filter events
            $crawler = new Crawler($htmlContent);

            // Assuming events are in a li with class 'event-card'
            $events = $crawler->filter('.event-card')->each(function (Crawler $node) {
                $title = $node->filter('.title h3')->count() ? $node->filter('.title h3')->text() : 'No title';
                $date = $node->filter('.meta-bottom .date')->count() ? $node->filter('.meta-bottom .date')->text() : 'No date';
                $location = $node->filter('.subtitle')->count() ? $node->filter('.subtitle')->text() : 'No location';
                $link = $node->attr('data-link') ?? 'No link';

                return [
                    'title' => $title,
                    'date' => $date,
                    'location' => $location,
                    'link' => $link,
                ];
            });

            return response()->json($events);

        } else {
            return response()->json(['error' => 'Failed to fetch data'], 500);
        }
    }
}
