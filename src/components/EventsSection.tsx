import React, { useEffect, useMemo, useState } from 'react';
import { 
  AlertCircle,
  Calendar, 
  MapPin, 
  Clock,
  Sparkles,
  Timer,
  CheckCircle2,
  Archive,
  RotateCcw,
  CalendarDays
} from 'lucide-react';
import { EventItem } from '../types';
import { fetchLiveEvents } from '../utils/events';
import { publicAssetPath } from '../utils/assets';
import { 
  getEventTiming, 
  isEventPast, 
  sortEventsChronologically 
} from '../utils/eventDateUtils';

type EventCategory = 'all' | 'academic' | 'sports' | 'meetings';
type EventViewMode = 'upcoming' | 'archive';

const resolveEventImage = (imageUrl: string, fallback: string) => {
  const trimmedImageUrl = imageUrl.trim();
  if (!trimmedImageUrl) return fallback;
  if (/^https?:\/\//i.test(trimmedImageUrl)) return trimmedImageUrl;
  return publicAssetPath(trimmedImageUrl);
};

const EVENTS_DATA: EventItem[] = [
  {
    id: 'foundation-phase-excursion-2026',
    title: 'Excursion (Foundation Phase) - R160.00',
    category: 'academic',
    categoryLabel: 'Excursion',
    date: 'October 15, 2026',
    time: 'Time to be confirmed',
    location: 'Venue to be confirmed',
    description: 'Foundation Phase learners will attend a school excursion. Cost: R160.00.',
    imageUrl: 'event-excursion.jpg'
  },
  {
    id: 'intermediate-phase-excursion-2026',
    title: 'Excursion (Intermediate Phase) - R160.00',
    category: 'academic',
    categoryLabel: 'Excursion',
    date: 'October 16, 2026',
    time: 'Time to be confirmed',
    location: 'Venue to be confirmed',
    description: 'Intermediate Phase learners will attend a school excursion. Cost: R160.00.',
    imageUrl: 'event-excursion.jpg'
  },
  {
    id: 'grade-7-farewell-2026',
    title: 'Farewell (Grade 7) - R700.00',
    category: 'academic',
    categoryLabel: 'Farewell',
    date: 'November 06, 2026',
    time: 'Time to be confirmed',
    location: 'Phikiswayo Primary School',
    description: 'Grade 7 farewell celebration for graduating learners.',
    imageUrl: 'event-awards.jpg'
  },
  {
    id: 'summative-assessment-2026',
    title: 'Summative Assessment Week',
    category: 'academic',
    categoryLabel: 'Assessment',
    date: 'November 09 - 13, 2026',
    time: '08:00 – 14:00 Daily',
    location: 'Main Academic Block',
    description: 'Term 4 summative assessment block for Grades R through 7.',
    imageUrl: 'event-career-expo.jpg'
  },
  {
    id: 'sgb-meeting-november-2026',
    title: 'School Governing Body (SGB) Meeting',
    category: 'meetings',
    categoryLabel: 'SGB Meeting',
    date: 'November 21, 2026',
    time: '14:00 – 16:30',
    location: 'Phikiswayo Primary School',
    description: 'Scheduled School Governing Body governance and planning meeting.',
    imageUrl: 'event-meeting.jpg'
  },
  {
    id: 'excellence-awards-2026',
    title: 'Excellence Awards & Closing Assembly',
    category: 'academic',
    categoryLabel: 'Awards',
    date: 'December 04, 2026',
    time: '09:30 – 13:00',
    location: 'Phikiswayo Primary School Hall',
    description: 'Ceremony celebrating academic excellence, leadership, and end of year recognitions.',
    imageUrl: 'event-awards.jpg'
  }
];

export const EventsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<EventCategory>('all');
  const [viewMode, setViewMode] = useState<EventViewMode>('upcoming');
  const [events, setEvents] = useState<EventItem[]>(EVENTS_DATA);
  const [liveEventError, setLiveEventError] = useState(false);
  const defaultEventImage = publicAssetPath('school-hero.jpg');

  useEffect(() => {
    let isMounted = true;

    fetchLiveEvents()
      .then((liveEvents) => {
        if (isMounted && liveEvents !== null) {
          setEvents(liveEvents);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLiveEventError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Separate upcoming and past events using the current date
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const upcoming: EventItem[] = [];
    const past: EventItem[] = [];

    for (const item of events) {
      if (isEventPast(item.date)) {
        past.push(item);
      } else {
        upcoming.push(item);
      }
    }

    return {
      upcomingEvents: sortEventsChronologically(upcoming, true),
      pastEvents: sortEventsChronologically(past, false),
    };
  }, [events]);

  // Current active pool depending on view mode
  const currentPool = viewMode === 'upcoming' ? upcomingEvents : pastEvents;

  // Filter pool by category
  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return currentPool;
    return currentPool.filter((e) => e.category === activeCategory);
  }, [currentPool, activeCategory]);

  // Nearest upcoming event for spotlight highlight
  const nearestUpcomingEvent = useMemo(() => {
    return upcomingEvents.length > 0 ? upcomingEvents[0] : null;
  }, [upcomingEvents]);

  // Category counts for active view mode
  const categoryCounts = useMemo(() => {
    return {
      all: currentPool.length,
      academic: currentPool.filter((e) => e.category === 'academic').length,
      sports: currentPool.filter((e) => e.category === 'sports').length,
      meetings: currentPool.filter((e) => e.category === 'meetings').length,
    };
  }, [currentPool]);

  return (
    <section className="py-20 bg-neutral-50/60" id="events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10" id="events-header">
          <div className="text-center lg:text-left max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-[#ff2121] font-bold text-xs uppercase tracking-widest border border-red-200 mb-3">
              Calendar & Highlights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#ff2121] font-display">
              {viewMode === 'upcoming' ? 'Upcoming School Events & Activities' : 'Completed School Events Archive'}
            </h2>
            <p className="mt-3 text-neutral-600 text-sm sm:text-base">
              {viewMode === 'upcoming'
                ? 'Events that have concluded are automatically cleared, keeping the calendar updated with what is happening next.'
                : 'Browse completed events, meetings, and activities from earlier in the academic year.'}
            </p>
          </div>

          {liveEventError && (
            <div className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-800">
              <AlertCircle className="w-4 h-4" />
              <span>Showing saved events while live events are unavailable.</span>
            </div>
          )}
        </div>

        {/* Auto-Removal Status Bar & Archive Switcher */}
        <div 
          className="mb-10 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
          id="events-auto-filter-status"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              viewMode === 'upcoming' ? 'bg-emerald-100 text-emerald-700' : 'bg-neutral-100 text-neutral-700'
            }`}>
              {viewMode === 'upcoming' ? <CheckCircle2 className="w-5 h-5" /> : <Archive className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                  viewMode === 'upcoming' 
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                    : 'bg-neutral-100 text-neutral-700 border border-neutral-300'
                }`}>
                  {viewMode === 'upcoming' ? 'Auto-Filter Active' : 'Archive Mode'}
                </span>
                <span className="text-xs text-neutral-500 font-medium">
                  {viewMode === 'upcoming'
                    ? `${upcomingEvents.length} upcoming events active • ${pastEvents.length} past events auto-removed`
                    : `Viewing ${pastEvents.length} completed past events`}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 font-semibold mt-0.5">
                {viewMode === 'upcoming'
                  ? 'Past events are automatically hidden so you only see what is coming next.'
                  : 'Completed dates are kept on record for parent and administrative reference.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            {viewMode === 'upcoming' ? (
              <button
                type="button"
                onClick={() => setViewMode('archive')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition cursor-pointer border border-neutral-300"
                id="view-archive-btn"
              >
                <Archive className="w-4 h-4 text-neutral-600" />
                <span>View Past Events ({pastEvents.length})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setViewMode('upcoming')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#ff2121] hover:bg-[#e01a1a] text-white transition cursor-pointer shadow-md"
                id="view-upcoming-btn"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Back to Upcoming ({upcomingEvents.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Spotlight Feature: Nearest Upcoming Event */}
        {viewMode === 'upcoming' && nearestUpcomingEvent && (
          <div 
            className="mb-12 rounded-3xl bg-gradient-to-br from-red-50 via-white to-red-50/40 border-2 border-[#ff2121] p-6 sm:p-8 shadow-lg relative overflow-hidden"
            id="nearest-event-spotlight"
          >
            {/* Background Decorative Accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              {/* Event Image Banner */}
              <div className="w-full lg:w-2/5 h-56 sm:h-64 rounded-2xl overflow-hidden relative shadow-md bg-neutral-900 shrink-0">
                <img
                  src={resolveEventImage(nearestUpcomingEvent.imageUrl, defaultEventImage)}
                  alt={nearestUpcomingEvent.title}
                  referrerPolicy="no-referrer"
                  onError={(imageEvent) => {
                    imageEvent.currentTarget.src = defaultEventImage;
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Highlight Label */}
                <div className="absolute top-3 left-3 bg-[#ff2121] text-white px-3 py-1 rounded-lg text-xs font-extrabold shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>NEXT UPCOMING EVENT</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                  <span className="bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-md">
                    {nearestUpcomingEvent.categoryLabel}
                  </span>
                  <span className="bg-white text-[#ff2121] px-2.5 py-1 rounded-md shadow-sm font-extrabold flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    {getEventTiming(nearestUpcomingEvent.date).label}
                  </span>
                </div>
              </div>

              {/* Event Spotlight Details */}
              <div className="w-full lg:w-3/5 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#ff2121] text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Happening Soonest
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-bold">
                    <Timer className="w-3.5 h-3.5 text-red-400" />
                    {getEventTiming(nearestUpcomingEvent.date).label}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 font-display leading-tight">
                  {nearestUpcomingEvent.title}
                </h3>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                  {nearestUpcomingEvent.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm text-neutral-600 border-t border-red-200">
                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-neutral-200">
                    <Calendar className="w-4 h-4 text-[#ff2121] shrink-0" />
                    <span className="font-bold text-neutral-900">{nearestUpcomingEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-neutral-200">
                    <Clock className="w-4 h-4 text-[#ff2121] shrink-0" />
                    <span className="text-neutral-700">{nearestUpcomingEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-neutral-200">
                    <MapPin className="w-4 h-4 text-[#ff2121] shrink-0" />
                    <span className="text-neutral-700 truncate">{nearestUpcomingEvent.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabbed Category Filters with Counts */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" id="events-filter-buttons">
          
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-white text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-all"
          >
            <span>All Events</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}>
              {categoryCounts.all}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('academic')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer flex items-center gap-2 ${
              activeCategory === 'academic'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-white text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-academic"
          >
            <span>Academic</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              activeCategory === 'academic' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}>
              {categoryCounts.academic}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('meetings')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer flex items-center gap-2 ${
              activeCategory === 'meetings'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-white text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-meetings"
          >
            <span>Parent Meetings</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              activeCategory === 'meetings' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}>
              {categoryCounts.meetings}
            </span>
          </button>

          <button
            onClick={() => setActiveCategory('sports')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-sm cursor-pointer flex items-center gap-2 ${
              activeCategory === 'sports'
                ? 'bg-[#ff2121] text-white shadow-md'
                : 'bg-white text-neutral-700 hover:bg-red-50 border border-neutral-200'
            }`}
            id="event-tab-sports"
          >
            <span>Sports</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              activeCategory === 'sports' ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
            }`}>
              {categoryCounts.sports}
            </span>
          </button>

        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center max-w-xl mx-auto shadow-sm" id="events-empty-state">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#ff2121] flex items-center justify-center mx-auto mb-4">
              <CalendarDays className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              {viewMode === 'upcoming' ? 'No Upcoming Events in this Category' : 'No Past Events Found'}
            </h3>
            <p className="text-sm text-neutral-600 mb-6">
              {viewMode === 'upcoming'
                ? 'All scheduled activities in this category have concluded or will be announced soon. You can view all upcoming events or check past events.'
                : 'There are no completed events recorded in this category.'}
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#ff2121] text-white hover:bg-[#e01a1a] transition cursor-pointer"
              >
                View All Categories
              </button>
              {viewMode === 'upcoming' && pastEvents.length > 0 && (
                <button
                  type="button"
                  onClick={() => setViewMode('archive')}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition cursor-pointer border border-neutral-300"
                >
                  View Past Archive ({pastEvents.length})
                </button>
              )}
            </div>
          </div>
        )}

        {/* Events Grid */}
        {filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="events-grid">
            {filteredEvents.map((event, index) => {
              const imageSrc = resolveEventImage(event.imageUrl, defaultEventImage);
              const timing = getEventTiming(event.date);
              const isLeadUpcoming = viewMode === 'upcoming' && index === 0;

              return (
                <article
                  key={event.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group ${
                    isLeadUpcoming 
                      ? 'border-2 border-[#ff2121] ring-2 ring-red-100 shadow-md' 
                      : 'border border-neutral-200'
                  }`}
                  id={`event-card-${event.id}`}
                >
                  {/* Lead Highlight Header Banner */}
                  {isLeadUpcoming && (
                    <div className="bg-[#ff2121] text-white px-4 py-1.5 text-xs font-black flex items-center justify-between">
                      <span className="flex items-center gap-1.5 tracking-wider uppercase text-[11px]">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        Next Event On Calendar
                      </span>
                      <span className="bg-black/30 px-2 py-0.5 rounded text-[11px] font-bold">
                        {timing.label}
                      </span>
                    </div>
                  )}

                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden bg-neutral-800">
                    <img
                      src={imageSrc}
                      alt={event.title}
                      referrerPolicy="no-referrer"
                      onError={(imageEvent) => {
                        imageEvent.currentTarget.src = defaultEventImage;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
                    
                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-[#ff2121] text-white px-3 py-1 rounded-lg text-xs font-extrabold shadow-md flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>

                    {/* Countdown / Status Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-extrabold shadow-sm ${
                        timing.isPast
                          ? 'bg-neutral-800/90 text-neutral-300 backdrop-blur-sm'
                          : timing.urgency === 'today' || timing.urgency === 'tomorrow'
                          ? 'bg-amber-400 text-neutral-950 font-black'
                          : timing.urgency === 'this-week' || timing.urgency === 'soon'
                          ? 'bg-[#ff2121] text-white font-extrabold'
                          : 'bg-black/75 text-white backdrop-blur-sm'
                      }`}>
                        <Timer className="w-3 h-3" />
                        {timing.label}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                      {event.categoryLabel}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#ff2121] transition-colors mb-2">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                        {event.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5 text-[#ff2121] font-semibold">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-neutral-600">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

