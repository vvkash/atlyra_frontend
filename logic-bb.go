package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/gocolly/colly"
)

type ProductData struct {
	Context     string `json:"@context"`
	Type        string `json:"@type"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Offers      Offer  `json:"offers"`
}

type Offer struct {
	Type          string  `json:"@type"`
	Price         float64 `json:"price"`
	PriceCurrency string  `json:"priceCurrency"`
	Availability  string  `json:"availability"`
	URL           string  `json:"url"`
}

func main() {
	c := colly.NewCollector(
		colly.AllowURLRevisit(),
		colly.Async(true),
	)

	c.OnRequest(func(r *colly.Request) {
		r.Headers.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36")
		r.Headers.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8")
		r.Headers.Set("Accept-Language", "en-US,en;q=0.5")
		fmt.Println("Visiting", r.URL)
	})

	c.OnError(func(_ *colly.Response, err error) {
		fmt.Println("Error:", err)
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Got response:", r.StatusCode)
		fmt.Println("Response body preview:", string(r.Body[:500]))
	})

	c.OnHTML("script", func(e *colly.HTMLElement) {
		text := e.Text
		if len(text) == 0 {
			return
		}

		fmt.Printf("\nFound script tag: %s\n", text[:min(100, len(text))])

		if strings.Contains(text, "product") || strings.Contains(text, "Product") {
			var product ProductData
			if err := json.Unmarshal([]byte(text), &product); err != nil {
				if strings.Contains(text, "window.") {
					parts := strings.Split(text, "=")
					if len(parts) > 1 {
						jsonStr := strings.TrimSpace(parts[1])
						if err := json.Unmarshal([]byte(jsonStr), &product); err == nil {
							fmt.Printf("Found product data in JavaScript: %+v\n", product)
						}
					}
				}
				return
			}

			if product.Type == "Product" || product.Name != "" {
				fmt.Printf("\nProduct found: %+v\n", product)
			}
		}
	})

	c.OnHTML(".price, [data-price], .product-price", func(e *colly.HTMLElement) {
		fmt.Printf("Found price element: %s\n", e.Text)
	})

	err := c.Visit("https://www.stanley1913.com/products/quencher-protour-flipstraw-tumbler")
	if err != nil {
		fmt.Println("Visit error:", err)
		return
	}

	c.Wait()
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
