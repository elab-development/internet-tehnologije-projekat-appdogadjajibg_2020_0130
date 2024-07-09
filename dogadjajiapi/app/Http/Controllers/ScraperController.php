<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

class ScraperController extends Controller
{
    public function fetchEvents()
    {
        $urls = [
        //    'https://allevents.in/belgrade/all',
            'https://goout.rs/'
        ];

        $events = [];
        $client = new Client();

        foreach ($urls as $url) {
            try {
                $response = $client->get($url);
                $html = $response->getBody()->getContents();
                $crawler = new Crawler($html);

                if (strpos($url, 'allevents.in') !== false) {
                    $crawler->filter('li.event-card')->each(function (Crawler $node, $index) use (&$events, $url) {
                        $title = $node->filter('div.title h3')->text();
                        $description = $node->filter('div.subtitle')->text();
                        $date = $node->filter('div.meta-bottom .date')->text();
                        $place = $node->filter('div.subtitle')->text();

                        $events[] = [
                            'id' => $url . '-' . $index,
                            'title' => $title,
                            'description' => $description,
                            'date' => $date,
                            'place' => $place,
                            'category' => 'Various'
                        ];
                    });
                } else    if (strpos($url, 'goout.rs') !== false) {
                    $crawler->filter('.events .event-item')->each(function (Crawler $node, $index) use (&$events, $url) {
                        $title = $node->filter('.event-title')->text();
                        $description = $node->filter('.event-description')->text();
                        $date = $node->filter('.event-date')->text();
                        $place = $node->filter('.event-location')->text();

                        $events[] = [
                            'id' => $url . '-' . $index,
                            'title' => $title,
                            'description' => $description,
                            'date' => $date,
                            'place' => $place,
                            'category' => 'Various'
                        ];
                    });
                }
            } catch (\Exception $e) {
                return response()->json(['error' => 'Error fetching data from ' . $url . ': ' . $e->getMessage()], 500);
            }
        }

        return response()->json($events);
    }
}
