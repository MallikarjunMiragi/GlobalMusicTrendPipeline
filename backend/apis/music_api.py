"""
Enhanced FastAPI Backend with JioSaavn Integration
Global Music Trend & Genre Popularity Pipeline
Author: CS3238 Data Engineering Project
Version: 2.1.1 - Fixed server persistence issue
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime
import sys
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Add data-ingestion to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'data-ingestion'))

try:
    from jiosaavn_wrapper import JioSaavnMusicConnector
    logger.info("✅ Successfully imported JioSaavn wrapper")
except ImportError as e:
    logger.error(f"❌ Failed to import JioSaavn wrapper: {e}")
    logger.error("Make sure jiosaavn_wrapper.py is in backend/data-ingestion/")
    sys.exit(1)

# Initialize JioSaavn connector globally
jiosaavn_connector = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler - replaces deprecated @app.on_event"""
    global jiosaavn_connector
    
    # Startup
    logger.info("🚀 Starting Global Music Trend API...")
    logger.info("🎵 Indian Music Focus: Active")
    logger.info("📊 Real-time Analytics: Enabled")
    
    try:
        jiosaavn_connector = JioSaavnMusicConnector()
        logger.info("✅ JioSaavn connector initialized")
        
        if jiosaavn_connector.test_connection():
            logger.info("✅ JioSaavn API connection successful")
        else:
            logger.warning("⚠️ JioSaavn API connection failed - check if JioSaavn API is running on port 5100")
    except Exception as e:
        logger.error(f"❌ Failed to initialize JioSaavn connector: {e}")
        jiosaavn_connector = None
    
    yield  # Application runs here
    
    # Shutdown
    logger.info("👋 Shutting down Global Music Trend API")
    logger.info("🔄 Cleanup completed")

# Initialize FastAPI app with lifespan
app = FastAPI(
    title="Global Music Trend API - JioSaavn Integration",
    description="Real-time Indian music analytics using JioSaavn API with professional data engineering",
    version="2.1.1",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000", 
        "http://localhost:3001",
        "http://localhost:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """API homepage with comprehensive information"""
    return {
        "message": "🎵 Global Music Trend API - JioSaavn Integration",
        "status": "operational",
        "version": "2.1.1",
        "data_source": "JioSaavn (Indian Music Focus)",
        "features": [
            "Real-time trending Indian music",
            "Comprehensive music analytics", 
            "Multi-language support (Hindi, Telugu, Punjabi, etc.)",
            "Genre classification (Bollywood, Regional, Trending)",
            "High-quality metadata with play counts",
            "Artist popularity tracking",
            "Modern FastAPI with lifespan events"
        ],
        "endpoints": {
            "/trending": "Get trending Indian music tracks",
            "/analytics": "Comprehensive music analytics dashboard data",
            "/search": "Search tracks by query (e.g., ?query=arijit singh)",
            "/health": "API health and connectivity status",
            "/test": "Simple test endpoint",
            "/docs": "Interactive API documentation",
            "/redoc": "Alternative API documentation"
        },
        "project_info": {
            "name": "Global Music Trend & Genre Popularity Pipeline",
            "course": "CS3238 - Fundamentals of Data Engineering",
            "focus": "Indian Music Market Analytics",
            "technologies": ["FastAPI", "JioSaavn API", "Pandas", "Python"]
        },
        "timestamp": datetime.now().isoformat()
    }

@app.get("/health")
async def health_check():
    """Comprehensive health check endpoint"""
    jiosaavn_status = "connected"
    connection_test = False
    
    if jiosaavn_connector:
        try:
            connection_test = jiosaavn_connector.test_connection()
            jiosaavn_status = "connected" if connection_test else "disconnected"
        except Exception as e:
            jiosaavn_status = f"error: {str(e)}"
    else:
        jiosaavn_status = "not_initialized"
    
    return {
        "api_status": "healthy",
        "jiosaavn_api": jiosaavn_status,
        "data_source": "JioSaavn Indian Music API",
        "connection_test": connection_test,
        "timestamp": datetime.now().isoformat(),
        "uptime": "operational",
        "version": "2.1.1",
        "services": {
            "fastapi": "running",
            "jiosaavn_wrapper": "loaded" if jiosaavn_connector else "failed",
            "jiosaavn_api": jiosaavn_status,
            "lifespan_events": "modern_implementation"
        },
        "system_info": {
            "python_path_configured": True,
            "cors_enabled": True,
            "documentation_available": True
        }
    }

@app.get("/trending")
async def get_trending_tracks(limit: int = 25):
    """Get trending music tracks from JioSaavn with comprehensive analytics"""
    if not jiosaavn_connector:
        raise HTTPException(
            status_code=503, 
            detail="JioSaavn connector not available. Please check if the service is running."
        )
    
    try:
        logger.info(f"📊 Fetching {limit} trending tracks...")
        
        # Get comprehensive trending data
        music_data = jiosaavn_connector.get_comprehensive_trending_data(limit=limit)
        
        if music_data.empty:
            raise HTTPException(
                status_code=404, 
                detail="No trending data available. Check if JioSaavn API is running on port 5100"
            )
        
        tracks = music_data.to_dict('records')
        
        # Calculate analytics
        total_plays = int(music_data['play_count'].sum())
        avg_popularity = float(music_data['popularity'].mean())
        
        # Get top performers
        top_track = music_data.loc[music_data['popularity'].idxmax()]
        most_played = music_data.loc[music_data['play_count'].idxmax()]
        
        # Language and genre insights
        language_dist = music_data['language'].value_counts().to_dict()
        genre_dist = music_data['genre'].value_counts().to_dict()
        
        response = {
            "success": True,
            "tracks": tracks,
            "metadata": {
                "total_tracks": len(tracks),
                "limit": limit,
                "timestamp": datetime.now().isoformat(),
                "data_source": "jiosaavn_api",
                "api_version": "2.1.1"
            },
            "analytics": {
                "overview": {
                    "total_plays": total_plays,
                    "avg_popularity": round(avg_popularity, 1),
                    "unique_artists": len(set([artist.strip() for artists in music_data['artist'] for artist in str(artists).split(',')])),
                    "languages_covered": len(language_dist),
                    "genres_covered": len(genre_dist)
                },
                "distributions": {
                    "by_language": language_dist,
                    "by_genre": genre_dist
                },
                "top_performers": {
                    "highest_popularity": {
                        "name": top_track['track_name'],
                        "artist": top_track['artist'],
                        "popularity": int(top_track['popularity']),
                        "language": top_track['language']
                    },
                    "most_played": {
                        "name": most_played['track_name'],
                        "artist": most_played['artist'],
                        "plays": int(most_played['play_count']),
                        "genre": most_played['genre']
                    }
                },
                "market_insights": {
                    "bollywood_percentage": round(len(music_data[music_data['genre'] == 'bollywood']) / len(music_data) * 100, 1),
                    "hindi_content_percentage": round(len(music_data[music_data['language'] == 'hindi']) / len(music_data) * 100, 1),
                    "regional_diversity": music_data['language'].nunique()
                }
            }
        }
        
        logger.info(f"✅ Successfully returned {len(tracks)} trending tracks with analytics")
        return response
        
    except Exception as e:
        logger.error(f"❌ Error fetching trending data: {e}")
        raise HTTPException(status_code=500, detail=f"Error fetching trending data: {str(e)}")

@app.get("/analytics")
async def get_comprehensive_analytics():
    """Get comprehensive music market analytics with detailed insights"""
    if not jiosaavn_connector:
        raise HTTPException(status_code=503, detail="JioSaavn connector not available")
    
    try:
        logger.info("📊 Generating comprehensive analytics...")
        
        # Get larger dataset for analytics
        music_data = jiosaavn_connector.get_comprehensive_trending_data(limit=50)
        
        if music_data.empty:
            raise HTTPException(status_code=404, detail="No analytics data available")
        
        # Extract unique artists
        all_artists = []
        for artists_str in music_data['artist']:
            artists = [artist.strip() for artist in str(artists_str).split(',')]
            all_artists.extend(artists)
        unique_artists = len(set(all_artists))
        
        # Calculate comprehensive analytics
        analytics = {
            "market_overview": {
                "total_tracks_analyzed": len(music_data),
                "unique_artists": unique_artists,
                "total_plays": int(music_data['play_count'].sum()),
                "avg_popularity_score": round(float(music_data['popularity'].mean()), 2),
                "data_freshness": datetime.now().isoformat(),
                "analysis_version": "2.1.1"
            },
            "content_distribution": {
                "by_language": music_data['language'].value_counts().to_dict(),
                "by_genre": music_data['genre'].value_counts().to_dict(),
                "by_label": music_data['label'].value_counts().head(5).to_dict()
            },
            "performance_metrics": {
                "top_performers": {
                    "highest_popularity": {
                        "track": music_data.loc[music_data['popularity'].idxmax(), 'track_name'],
                        "artist": music_data.loc[music_data['popularity'].idxmax(), 'artist'],
                        "score": int(music_data['popularity'].max()),
                        "language": music_data.loc[music_data['popularity'].idxmax(), 'language']
                    },
                    "most_played": {
                        "track": music_data.loc[music_data['play_count'].idxmax(), 'track_name'],
                        "artist": music_data.loc[music_data['play_count'].idxmax(), 'artist'],
                        "plays": int(music_data['play_count'].max()),
                        "genre": music_data.loc[music_data['play_count'].idxmax(), 'genre']
                    }
                },
                "averages": {
                    "avg_popularity": round(float(music_data['popularity'].mean()), 2),
                    "avg_plays": int(music_data['play_count'].mean()),
                    "avg_duration_seconds": int(music_data['duration_ms'].mean() / 1000) if 'duration_ms' in music_data else 0,
                    "median_popularity": round(float(music_data['popularity'].median()), 2)
                }
            },
            "market_insights": {
                "bollywood_dominance_percentage": round(
                    len(music_data[music_data['genre'] == 'bollywood']) / len(music_data) * 100, 1
                ),
                "hindi_content_percentage": round(
                    len(music_data[music_data['language'] == 'hindi']) / len(music_data) * 100, 1
                ),
                "trending_content_percentage": round(
                    len(music_data[music_data['genre'] == 'trending']) / len(music_data) * 100, 1
                ),
                "regional_diversity_score": music_data['language'].nunique(),
                "south_indian_representation": round(
                    len(music_data[music_data['genre'] == 'south_indian']) / len(music_data) * 100, 1
                )
            },
            "quality_metrics": {
                "data_completeness": {
                    "tracks_with_play_counts": len(music_data[music_data['play_count'] > 0]),
                    "tracks_with_images": len(music_data[music_data['image_url'].notna()]),
                    "tracks_with_preview": len(music_data[music_data['preview_url'].notna()])
                }
            },
            "timestamp": datetime.now().isoformat(),
            "data_source": "jiosaavn_comprehensive_analysis"
        }
        
        logger.info("✅ Successfully generated comprehensive analytics")
        return analytics
        
    except Exception as e:
        logger.error(f"❌ Error generating analytics: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating analytics: {str(e)}")

@app.get("/search")
async def search_tracks(query: str, limit: int = 20):
    """Search for tracks by query with detailed results"""
    if not jiosaavn_connector:
        raise HTTPException(status_code=503, detail="JioSaavn connector not available")
    
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query parameter is required")
    
    try:
        logger.info(f"🔍 Searching for: '{query}' (limit: {limit})")
        
        # Use JioSaavn search
        songs = jiosaavn_connector.search_trending_songs(query, limit=limit)
        
        if not songs:
            return {
                "success": True,
                "tracks": [],
                "metadata": {
                    "total": 0,
                    "query": query,
                    "limit": limit,
                    "message": "No results found",
                    "timestamp": datetime.now().isoformat()
                }
            }
        
        # Parse and normalize results
        tracks = []
        for song in songs:
            parsed = jiosaavn_connector.parse_song_data(song)
            if parsed and parsed.get('track_id'):
                tracks.append(parsed)
        
        response = {
            "success": True,
            "tracks": tracks,
            "metadata": {
                "total": len(tracks),
                "query": query,
                "limit": limit,
                "timestamp": datetime.now().isoformat(),
                "data_source": "jiosaavn_search",
                "search_version": "2.1.1"
            }
        }
        
        if tracks:
            # Add search analytics
            import pandas as pd
            search_df = pd.DataFrame(tracks)
            response["analytics"] = {
                "search_insights": {
                    "results_found": len(tracks),
                    "unique_artists": len(set([artist.strip() for artists in search_df['artist'] for artist in str(artists).split(',')])),
                    "avg_popularity": round(float(search_df['popularity'].mean()), 2),
                    "total_plays": int(search_df['play_count'].sum()) if 'play_count' in search_df else 0
                },
                "content_breakdown": {
                    "by_language": search_df['language'].value_counts().to_dict(),
                    "by_genre": search_df['genre'].value_counts().to_dict()
                }
            }
        
        logger.info(f"✅ Search returned {len(tracks)} results for '{query}'")
        return response
        
    except Exception as e:
        logger.error(f"❌ Search error for query '{query}': {e}")
        raise HTTPException(status_code=500, detail=f"Search error: {str(e)}")

@app.get("/test")
async def test_endpoint():
    """Simple test endpoint to verify API functionality"""
    return {
        "message": "🎵 Test endpoint working perfectly!",
        "status": "operational",
        "jiosaavn_connector": "loaded" if jiosaavn_connector else "not loaded",
        "api_version": "2.1.1",
        "features": {
            "lifespan_events": "implemented",
            "modern_fastapi": "enabled",
            "comprehensive_logging": "active"
        },
        "timestamp": datetime.now().isoformat(),
        "test_passed": True
    }

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Global Music Trend API with JioSaavn Integration...")
    print("🎵 Indian Music Focus: Active")
    print("📊 Real-time Analytics: Enabled")
    print("🔧 Modern Lifespan Events: Implemented")
    print("🌐 API Documentation: http://localhost:8000/docs")
    print("📖 Alternative Docs: http://localhost:8000/redoc")
    # KEY FIX: Use import string format to enable reload properly
    uvicorn.run("music_api:app", host="0.0.0.0", port=8000, reload=True)
