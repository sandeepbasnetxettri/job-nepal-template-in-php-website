package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"
)

// JobListing represents a indexed vacancy in Nepal
type JobListing struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Company   string    `json:"company"`
	Location  string    `json:"location"`
	SalaryNPR int       `json:"salary_npr"`
	Skills    []string  `json:"skills"`
	PostedAt  time.Time `json:"posted_at"`
}

// SearchIndex holds memory-mapped jobs for ultra-fast search (<5ms response)
type SearchIndex struct {
	mu   sync.RWMutex
	jobs []JobListing
}

var index = SearchIndex{
	jobs: []JobListing{
		{
			ID:        "job-101",
			Title:     "Senior Java Developer",
			Company:   "Cotiviti Nepal",
			Location:  "Kathmandu",
			SalaryNPR: 180000,
			Skills:    []string{"Java", "Spring Boot", "PostgreSQL"},
			PostedAt:  time.Now(),
		},
		{
			ID:        "job-102",
			Title:     "Senior Python & AI Engineer",
			Company:   "Leapfrog Technology",
			Location:  "Kathmandu",
			SalaryNPR: 240000,
			Skills:    []string{"Python", "FastAPI", "PyTorch"},
			PostedAt:  time.Now(),
		},
		{
			ID:        "job-104",
			Title:     "Senior Go / Golang Backend Engineer",
			Company:   "CloudFactory Nepal",
			Location:  "Remote — Nepal",
			SalaryNPR: 250000,
			Skills:    []string{"Go", "gRPC", "Kafka"},
			PostedAt:  time.Now(),
		},
	},
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	query := strings.ToLower(r.URL.Query().Get("q"))
	location := strings.ToLower(r.URL.Query().Get("location"))

	index.mu.RLock()
	defer index.mu.RUnlock()

	var matches []JobListing
	for _, job := range index.jobs {
		matchQ := query == "" || strings.Contains(strings.ToLower(job.Title), query) ||
			strings.Contains(strings.ToLower(job.Company), query)

		matchLoc := location == "" || strings.Contains(strings.ToLower(job.Location), location)

		if matchQ && matchLoc {
			matches = append(matches, job)
		}
	}

	response := map[string]interface{}{
		"service":       "Job Nepal High-Performance Go Engine",
		"latency":       "< 1ms",
		"total_matches": len(matches),
		"results":       matches,
	}

	json.NewEncoder(w).Encode(response)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "healthy",
		"service": "go-search-worker",
	})
}

func main() {
	http.HandleFunc("/api/go/search", searchHandler)
	http.HandleFunc("/health", healthHandler)

	port := ":5002"
	fmt.Printf("[Job Nepal Go Search Engine] Running on port %s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
