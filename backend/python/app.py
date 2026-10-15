"""
JOB NEPAL — Python AI & Machine Learning Recommendation Engine
Role: Calculate candidate-to-job match score percentage (e.g. 85% Match)
Based on skills overlap, education level, experience, and location affinity.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Weight vectors for matching calculation
SKILL_WEIGHT = 0.50
EXPERIENCE_WEIGHT = 0.20
LOCATION_WEIGHT = 0.15
EDUCATION_WEIGHT = 0.15

SAMPLE_JOB_DATABASE = [
    {
        "id": "job-101",
        "title": "Senior Java Developer",
        "company": "Cotiviti Nepal",
        "skills": ["java", "spring boot", "postgresql", "docker", "rest api"],
        "location": "kathmandu",
        "min_experience_years": 3,
        "education": "bachelor"
    },
    {
        "id": "job-102",
        "title": "Senior Python & AI Engineer",
        "company": "Leapfrog Technology",
        "skills": ["python", "django", "fastapi", "sql", "pytorch", "llm"],
        "location": "kathmandu",
        "min_experience_years": 4,
        "education": "bachelor"
    },
    {
        "id": "job-103",
        "title": "Full Stack JavaScript Developer",
        "company": "F1Soft International",
        "skills": ["javascript", "react", "node.js", "typescript", "mongodb"],
        "location": "lalitpur",
        "min_experience_years": 2,
        "education": "bachelor"
    },
    {
        "id": "job-104",
        "title": "Senior Go / Golang Backend Engineer",
        "company": "CloudFactory Nepal",
        "skills": ["go", "golang", "grpc", "microservices", "docker", "kafka"],
        "location": "remote",
        "min_experience_years": 3,
        "education": "bachelor"
    }
]

def calculate_candidate_match(candidate, job):
    # 1. Skills Matching (Jaccard similarity with bonus for key stack)
    cand_skills = set([s.lower().strip() for s in candidate.get("skills", [])])
    job_skills = set([s.lower().strip() for s in job.get("skills", [])])

    if not job_skills:
        skill_score = 0.70
    else:
        intersection = cand_skills.intersection(job_skills)
        skill_score = len(intersection) / len(job_skills)

    # 2. Location Matching
    cand_loc = candidate.get("location", "").lower().strip()
    job_loc = job.get("location", "").lower().strip()
    if job_loc == "remote" or cand_loc == job_loc or "nepal" in cand_loc:
        loc_score = 1.0
    else:
        loc_score = 0.65

    # 3. Experience Matching
    cand_exp = candidate.get("experience_years", 3)
    job_exp = job.get("min_experience_years", 2)
    if cand_exp >= job_exp:
        exp_score = 1.0
    else:
        exp_score = max(0.5, cand_exp / job_exp)

    # 4. Education Matching
    edu_score = 0.95  # Assumed standard degree match

    # Total weighted score
    final_ratio = (
        (skill_score * SKILL_WEIGHT) +
        (exp_score * EXPERIENCE_WEIGHT) +
        (loc_score * LOCATION_WEIGHT) +
        (edu_score * EDUCATION_WEIGHT)
    )

    # Scale percentage from 50% to 98%
    match_percentage = round(50 + (final_ratio * 48))
    return min(match_percentage, 98)

@app.route("/api/ai/recommend", methods=["POST"])
def recommend_jobs():
    """
    Accepts candidate profile:
    {
      "skills": ["python", "django", "sql"],
      "location": "Kathmandu",
      "experience_years": 3
    }
    Returns ranked jobs with match percentages (e.g. 85% Match).
    """
    data = request.get_json() or {}
    candidate = {
        "skills": data.get("skills", ["python", "django", "sql"]),
        "location": data.get("location", "Kathmandu"),
        "experience_years": data.get("experience_years", 3)
    }

    results = []
    for job in SAMPLE_JOB_DATABASE:
        score = calculate_candidate_match(candidate, job)
        results.append({
            "job_id": job["id"],
            "title": job["title"],
            "company": job["company"],
            "match_score": score,
            "match_label": f"{score}% Match",
            "is_high_fit": score >= 80
        })

    # Sort descending by match score
    results.sort(key=lambda x: x["match_score"], reverse=True)

    return jsonify({
        "status": "success",
        "candidate_skills": candidate["skills"],
        "recommendations": results
    })

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"service": "Job Nepal Python Recommendation Engine", "status": "healthy"})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
