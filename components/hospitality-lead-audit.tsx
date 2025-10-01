"use client"

import { useState } from "react"
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Building2,
  Target,
  Zap,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function HospitalityLeadAudit() {
  const [checkpoint1, setCheckpoint1] = useState({
    inquiries: "",
    bookings: "",
    totalRevenue: "",
  })

  const [channels, setChannels] = useState([
    { name: "Direct Website", inquiries: "", bookings: "", commission: "0", benchmark: "35" },
    { name: "Booking.com", inquiries: "", bookings: "", commission: "15", benchmark: "22" },
    { name: "Airbnb", inquiries: "", bookings: "", commission: "15", benchmark: "20" },
    { name: "WhatsApp/Instagram DM", inquiries: "", bookings: "", commission: "0", benchmark: "55" },
    { name: "Google Business Profile", inquiries: "", bookings: "", commission: "0", benchmark: "28" },
    { name: "Travel Agent Referrals", inquiries: "", bookings: "", commission: "10", benchmark: "45" },
  ])

  const [checkpoint3, setCheckpoint3] = useState({
    totalInquiries: "",
    unanswered: "",
    avgResponseMinutes: "",
    noAvailability: "",
    priceIssues: "",
    slowResponse: "",
    wentToCompetitor: "",
  })

  // Checkpoint 1 Calculations
  const conversionRate =
    checkpoint1.inquiries && checkpoint1.bookings
      ? ((Number.parseFloat(checkpoint1.bookings) / Number.parseFloat(checkpoint1.inquiries)) * 100).toFixed(1)
      : "0"

  const revenuePerInquiry =
    checkpoint1.totalRevenue && checkpoint1.inquiries
      ? (Number.parseFloat(checkpoint1.totalRevenue) / Number.parseFloat(checkpoint1.inquiries)).toFixed(0)
      : "0"

  const revenuePerBooking =
    checkpoint1.totalRevenue && checkpoint1.bookings
      ? (Number.parseFloat(checkpoint1.totalRevenue) / Number.parseFloat(checkpoint1.bookings)).toFixed(0)
      : "0"

  const checkpoint1Status = () => {
    const rate = Number.parseFloat(conversionRate)
    if (rate >= 30)
      return {
        status: "elite",
        color: "text-emerald-600",
        bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
        border: "border-emerald-300",
        label: "Elite Performer",
        variant: "default" as const,
      }
    if (rate >= 20)
      return {
        status: "good",
        color: "text-cyan-600",
        bg: "bg-gradient-to-br from-cyan-50 to-blue-50",
        border: "border-cyan-300",
        label: "Industry Standard",
        variant: "secondary" as const,
      }
    if (rate >= 12)
      return {
        status: "warning",
        color: "text-amber-600",
        bg: "bg-gradient-to-br from-amber-50 to-orange-50",
        border: "border-amber-300",
        label: "Below Average",
        variant: "outline" as const,
      }
    return {
      status: "critical",
      color: "text-red-600",
      bg: "bg-gradient-to-br from-red-50 to-rose-50",
      border: "border-red-300",
      label: "Critical - Revenue Leak",
      variant: "destructive" as const,
    }
  }

  // Checkpoint 2 Calculations
  const channelMetrics = channels.map((channel) => {
    const inquiries = Number.parseFloat(channel.inquiries) || 0
    const bookings = Number.parseFloat(channel.bookings) || 0
    const rate = inquiries > 0 ? ((bookings / inquiries) * 100).toFixed(1) : "0"
    const commission = Number.parseFloat(channel.commission) || 0
    const benchmark = Number.parseFloat(channel.benchmark)

    const status =
      Number.parseFloat(rate) >= benchmark
        ? "winning"
        : Number.parseFloat(rate) >= benchmark * 0.7
          ? "acceptable"
          : "losing"

    const estimatedBookingValue =
      checkpoint1.bookings > 0 && checkpoint1.totalRevenue > 0
        ? Number.parseFloat(checkpoint1.totalRevenue) / Number.parseFloat(checkpoint1.bookings)
        : 0

    const commissionCost = bookings * estimatedBookingValue * (commission / 100)

    return { ...channel, rate, benchmark, status, commissionCost: commissionCost.toFixed(0) }
  })

  const totalCommissionCost = channelMetrics
    .reduce((sum, ch) => sum + Number.parseFloat(ch.commissionCost || 0), 0)
    .toFixed(0)

  // Checkpoint 3 Calculations
  const unansweredRate =
    checkpoint3.totalInquiries && checkpoint3.unanswered
      ? ((Number.parseFloat(checkpoint3.unanswered) / Number.parseFloat(checkpoint3.totalInquiries)) * 100).toFixed(1)
      : "0"

  const noAvailabilityPct =
    checkpoint3.totalInquiries && checkpoint3.noAvailability
      ? ((Number.parseFloat(checkpoint3.noAvailability) / Number.parseFloat(checkpoint3.totalInquiries)) * 100).toFixed(
          0,
        )
      : "0"

  const priceIssuesPct =
    checkpoint3.totalInquiries && checkpoint3.priceIssues
      ? ((Number.parseFloat(checkpoint3.priceIssues) / Number.parseFloat(checkpoint3.totalInquiries)) * 100).toFixed(0)
      : "0"

  const slowResponsePct =
    checkpoint3.totalInquiries && checkpoint3.slowResponse
      ? ((Number.parseFloat(checkpoint3.slowResponse) / Number.parseFloat(checkpoint3.totalInquiries)) * 100).toFixed(0)
      : "0"

  const competitorPct =
    checkpoint3.totalInquiries && checkpoint3.wentToCompetitor
      ? (
          (Number.parseFloat(checkpoint3.wentToCompetitor) / Number.parseFloat(checkpoint3.totalInquiries)) *
          100
        ).toFixed(0)
      : "0"

  const responseStatus = () => {
    const minutes = Number.parseFloat(checkpoint3.avgResponseMinutes)
    if (minutes <= 60)
      return {
        label: "Elite",
        variant: "default" as const,
        color: "text-emerald-600",
        bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
      }
    if (minutes <= 180)
      return {
        label: "Acceptable",
        variant: "secondary" as const,
        color: "text-cyan-600",
        bg: "bg-gradient-to-br from-cyan-50 to-blue-50",
      }
    if (minutes <= 720)
      return {
        label: "Slow",
        variant: "outline" as const,
        color: "text-amber-600",
        bg: "bg-gradient-to-br from-amber-50 to-orange-50",
      }
    return {
      label: "Critical",
      variant: "destructive" as const,
      color: "text-red-600",
      bg: "bg-gradient-to-br from-red-50 to-rose-50",
    }
  }

  const updateChannel = (index: number, field: string, value: string) => {
    const newChannels = [...channels]
    newChannels[index] = { ...newChannels[index], [field]: value }
    setChannels(newChannels)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-emerald-50/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="border-none shadow-2xl bg-gradient-to-br from-cyan-600 via-cyan-700 to-teal-700 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <CardHeader className="relative pb-8">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-4xl mb-3 font-bold text-balance">Guest Inquiry Conversion Audit</CardTitle>
                <CardDescription className="text-cyan-50 text-lg leading-relaxed text-pretty max-w-3xl">
                  Performance audit for independent hotels, boutique resorts, and vacation rental managers in Dubai, Abu
                  Dhabi, Riyadh, and Doha. Track inquiry-to-booking conversion, channel efficiency, and response
                  quality.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-xl border-2 border-cyan-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50 border-b-2 border-cyan-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                1
              </div>
              <div>
                <CardTitle className="text-2xl text-balance">Inquiry-to-Booking Conversion Rate</CardTitle>
                <CardDescription className="text-base mt-1">
                  Measure your booking efficiency across all channels
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label htmlFor="inquiries" className="text-base font-semibold flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-600" />
                  Total Inquiries
                </Label>
                <Input
                  id="inquiries"
                  type="number"
                  value={checkpoint1.inquiries}
                  onChange={(e) => setCheckpoint1({ ...checkpoint1, inquiries: e.target.value })}
                  placeholder="Last 90 days"
                  className="h-12 text-lg border-2 focus:border-cyan-500"
                />
                <p className="text-xs text-muted-foreground">All channels combined</p>
              </div>
              <div className="space-y-3">
                <Label htmlFor="bookings" className="text-base font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Confirmed Bookings
                </Label>
                <Input
                  id="bookings"
                  type="number"
                  value={checkpoint1.bookings}
                  onChange={(e) => setCheckpoint1({ ...checkpoint1, bookings: e.target.value })}
                  placeholder="Last 90 days"
                  className="h-12 text-lg border-2 focus:border-cyan-500"
                />
                <p className="text-xs text-muted-foreground">Paid + confirmed</p>
              </div>
              <div className="space-y-3">
                <Label htmlFor="revenue" className="text-base font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-600" />
                  Total Revenue
                </Label>
                <Input
                  id="revenue"
                  type="number"
                  value={checkpoint1.totalRevenue}
                  onChange={(e) => setCheckpoint1({ ...checkpoint1, totalRevenue: e.target.value })}
                  placeholder="AED/SAR/QAR"
                  className="h-12 text-lg border-2 focus:border-cyan-500"
                />
                <p className="text-xs text-muted-foreground">90-day revenue</p>
              </div>
            </div>

            <Card className={`${checkpoint1Status().bg} border-2 ${checkpoint1Status().border} shadow-lg`}>
              <CardContent className="pt-8 space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <BarChart3 className={`w-5 h-5 ${checkpoint1Status().color}`} />
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        Conversion Rate
                      </p>
                    </div>
                    <p className={`text-5xl font-bold ${checkpoint1Status().color} mb-1`}>{conversionRate}%</p>
                    <Badge variant={checkpoint1Status().variant} className="mt-2">
                      {checkpoint1Status().label}
                    </Badge>
                  </div>
                  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Revenue per Inquiry
                    </p>
                    <p className="text-4xl font-bold text-foreground">{revenuePerInquiry}</p>
                    <p className="text-xs text-muted-foreground mt-2">Per lead value</p>
                  </div>
                  <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-md">
                    <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Avg. Booking Value
                    </p>
                    <p className="text-4xl font-bold text-foreground">{revenuePerBooking}</p>
                    <p className="text-xs text-muted-foreground mt-2">Per booking</p>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 space-y-3">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-cyan-600" />
                    Gulf Region Benchmarks
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                      <span className="font-medium">Elite Performers</span>
                      <span className="font-bold text-emerald-700 text-lg">30%+</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-cyan-50 rounded-lg">
                      <span className="font-medium">Industry Standard</span>
                      <span className="font-bold text-cyan-700 text-lg">20-25%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Revenue Leak</span>
                      <span className="font-bold text-red-700 text-lg">&lt;12%</span>
                    </div>
                  </div>
                </div>

                {Number.parseFloat(conversionRate) < 20 && Number.parseFloat(conversionRate) > 0 && (
                  <Alert className="bg-amber-50 border-2 border-amber-300">
                    <AlertCircle className="h-5 w-5 text-amber-700" />
                    <AlertDescription className="text-amber-900">
                      <span className="font-bold">Action Required:</span> Your conversion is below industry standard.
                      Focus on response time (under 1 hour), pricing clarity, and availability transparency.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-2">
              <CardContent className="pt-6">
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-600" />
                  Formula
                </p>
                <p className="text-sm text-muted-foreground mb-3">(Confirmed Bookings ÷ Total Inquiries) × 100</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Elite properties in Dubai/Riyadh average 30-35% for direct channels. OTAs pull this down to 20-25%
                  blended.
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-2 border-emerald-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                2
              </div>
              <div>
                <CardTitle className="text-2xl text-balance">Channel Efficiency & Commission Cost</CardTitle>
                <CardDescription className="text-base mt-1">
                  Compare conversion rates across booking channels and identify which justify their commission fees
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            {channels.map((channel, index) => (
              <Card key={index} className="border-2 hover:border-cyan-300 transition-all shadow-md hover:shadow-lg">
                <CardContent className="pt-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl">{channel.name}</h3>
                    <Badge variant="outline" className="text-sm px-3 py-1 border-2">
                      {channel.commission}% commission
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`channel-${index}-inquiries`} className="text-sm font-semibold">
                        Inquiries
                      </Label>
                      <Input
                        id={`channel-${index}-inquiries`}
                        type="number"
                        value={channel.inquiries}
                        onChange={(e) => updateChannel(index, "inquiries", e.target.value)}
                        placeholder="0"
                        className="h-11 border-2 focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`channel-${index}-bookings`} className="text-sm font-semibold">
                        Bookings
                      </Label>
                      <Input
                        id={`channel-${index}-bookings`}
                        type="number"
                        value={channel.bookings}
                        onChange={(e) => updateChannel(index, "bookings", e.target.value)}
                        placeholder="0"
                        className="h-11 border-2 focus:border-cyan-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Conversion Rate</Label>
                      <div className="h-11 px-4 py-2 bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-200 rounded-lg text-base font-bold flex items-center justify-center text-cyan-700">
                        {channelMetrics[index].rate}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold">Commission Cost</Label>
                      <div className="h-11 px-4 py-2 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 text-red-700 rounded-lg text-base font-bold flex items-center justify-center">
                        {channelMetrics[index].commissionCost}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm p-3 bg-slate-50 rounded-lg">
                    <span className="text-muted-foreground">
                      Your rate: <strong className="text-foreground">{channelMetrics[index].rate}%</strong>
                    </span>
                    <span className="text-muted-foreground">
                      Gulf benchmark: <strong className="text-foreground">{channelMetrics[index].benchmark}%</strong>
                    </span>
                  </div>

                  <Alert
                    className={
                      channelMetrics[index].status === "winning"
                        ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300"
                        : channelMetrics[index].status === "acceptable"
                          ? "bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300"
                          : channelMetrics[index].status === "losing"
                            ? "bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-300"
                            : "bg-slate-50"
                    }
                  >
                    <AlertDescription className="text-sm font-medium">
                      {channelMetrics[index].status === "winning" &&
                        "✅ Winner: Above benchmark. Maximize this channel."}
                      {channelMetrics[index].status === "acceptable" &&
                        "⚠️ Acceptable: Close to benchmark. Room for improvement."}
                      {channelMetrics[index].status === "losing" &&
                        "🚫 Underperforming: Below benchmark. Review strategy or reduce dependency."}
                      {!channelMetrics[index].status && "Enter data to see performance"}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-2 border-amber-300 shadow-lg">
              <CardContent className="pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-amber-600 rounded-xl shadow-md">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900 text-2xl">Total Commission Cost</h3>
                    <p className="text-sm text-amber-700">Last 90 days</p>
                  </div>
                </div>
                <div className="text-5xl font-bold text-amber-900 mb-4">{totalCommissionCost}</div>
                <p className="text-base text-amber-800 leading-relaxed">
                  This is how much you paid OTAs and platforms. Direct bookings have 0% commission—every 1% shift to
                  direct saves money.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-2">
              <CardContent className="pt-6">
                <p className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-600" />
                  Gulf Region Benchmarks
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold">Direct Website</p>
                    <p className="text-2xl font-bold text-cyan-600">35%</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold">WhatsApp/DM</p>
                    <p className="text-2xl font-bold text-cyan-600">55%</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold">Google Business</p>
                    <p className="text-2xl font-bold text-cyan-600">28%</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold">Booking.com</p>
                    <p className="text-2xl font-bold text-cyan-600">22%</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold">Airbnb</p>
                    <p className="text-2xl font-bold text-cyan-600">20%</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="font-semibold">Travel Agents</p>
                    <p className="text-2xl font-bold text-cyan-600">45%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <Card className="shadow-xl border-2 border-cyan-100 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b-2 border-cyan-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                3
              </div>
              <div>
                <CardTitle className="text-2xl text-balance">Inquiry Response & Follow-up Quality</CardTitle>
                <CardDescription className="text-base mt-1">
                  In hospitality, speed kills. Guests book within hours of inquiry. Track response time and lost inquiry
                  reasons.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="total-inquiries" className="text-base font-semibold">
                  Total Inquiries (90 Days)
                </Label>
                <Input
                  id="total-inquiries"
                  type="number"
                  value={checkpoint3.totalInquiries}
                  onChange={(e) => setCheckpoint3({ ...checkpoint3, totalInquiries: e.target.value })}
                  placeholder="All channels"
                  className="h-12 text-lg border-2 focus:border-cyan-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="unanswered" className="text-base font-semibold">
                  Unanswered/Lost Inquiries
                </Label>
                <Input
                  id="unanswered"
                  type="number"
                  value={checkpoint3.unanswered}
                  onChange={(e) => setCheckpoint3({ ...checkpoint3, unanswered: e.target.value })}
                  placeholder="Never responded"
                  className="h-12 text-lg border-2 focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 shadow-md">
                <CardContent className="pt-6 text-center">
                  <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Unanswered Rate
                  </p>
                  <div className="text-5xl font-bold text-red-600 mb-2">{unansweredRate}%</div>
                  {Number.parseFloat(unansweredRate) > 10 && (
                    <Badge variant="destructive" className="mt-2">
                      High unanswered rate = direct revenue loss
                    </Badge>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Label htmlFor="response-time" className="text-base font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  Average Response Time (Minutes)
                </Label>
                <Input
                  id="response-time"
                  type="number"
                  value={checkpoint3.avgResponseMinutes}
                  onChange={(e) => setCheckpoint3({ ...checkpoint3, avgResponseMinutes: e.target.value })}
                  placeholder="From inquiry to first reply"
                  className="h-12 text-lg border-2 focus:border-cyan-500"
                />
                {checkpoint3.avgResponseMinutes && (
                  <Alert className={`${responseStatus().bg} border-2`}>
                    <Clock className="h-5 w-5" />
                    <AlertDescription className="flex items-center gap-3">
                      <Badge variant={responseStatus().variant} className="text-sm">
                        {responseStatus().label}
                      </Badge>
                      {Number.parseFloat(checkpoint3.avgResponseMinutes) > 60 && (
                        <span className="text-sm font-medium">Under 1 hour is gold standard</span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Lost Inquiry Breakdown
              </h3>

              <div className="space-y-5">
                <Card className="border-2">
                  <CardContent className="pt-6 space-y-3">
                    <Label htmlFor="no-availability" className="text-base font-semibold">
                      No Availability for Dates
                    </Label>
                    <Input
                      id="no-availability"
                      type="number"
                      value={checkpoint3.noAvailability}
                      onChange={(e) => setCheckpoint3({ ...checkpoint3, noAvailability: e.target.value })}
                      placeholder="Sold out / dates unavailable"
                      className="h-11 border-2 focus:border-cyan-500"
                    />
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Percentage of lost inquiries</span>
                      <span className="font-bold text-lg">{noAvailabilityPct}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6 space-y-3">
                    <Label htmlFor="price-issues" className="text-base font-semibold">
                      Price Too High / No Response to Quote
                    </Label>
                    <Input
                      id="price-issues"
                      type="number"
                      value={checkpoint3.priceIssues}
                      onChange={(e) => setCheckpoint3({ ...checkpoint3, priceIssues: e.target.value })}
                      placeholder="Guest didn't accept pricing"
                      className="h-11 border-2 focus:border-cyan-500"
                    />
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Percentage of lost inquiries</span>
                      <span className="font-bold text-lg">{priceIssuesPct}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6 space-y-3">
                    <Label htmlFor="slow-response" className="text-base font-semibold">
                      Slow Response / Staff Unresponsive
                    </Label>
                    <Input
                      id="slow-response"
                      type="number"
                      value={checkpoint3.slowResponse}
                      onChange={(e) => setCheckpoint3({ ...checkpoint3, slowResponse: e.target.value })}
                      placeholder="Lost due to response delays"
                      className="h-11 border-2 focus:border-cyan-500"
                    />
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Percentage of lost inquiries</span>
                      <span className="font-bold text-lg">{slowResponsePct}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardContent className="pt-6 space-y-3">
                    <Label htmlFor="competitor" className="text-base font-semibold">
                      Guest Booked with Competitor
                    </Label>
                    <Input
                      id="competitor"
                      type="number"
                      value={checkpoint3.wentToCompetitor}
                      onChange={(e) => setCheckpoint3({ ...checkpoint3, wentToCompetitor: e.target.value })}
                      placeholder="Lost to another property"
                      className="h-11 border-2 focus:border-cyan-500"
                    />
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Percentage of lost inquiries</span>
                      <span className="font-bold text-lg">{competitorPct}%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Alert className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300">
              <Zap className="h-5 w-5 text-cyan-700" />
              <AlertDescription>
                <p className="text-base font-bold text-cyan-900 mb-2">Response Time Best Practice</p>
                <p className="text-sm text-cyan-800 leading-relaxed">
                  Gulf region guests expect replies within 1 hour during business hours, 3 hours maximum after-hours.
                  Properties responding in under 60 minutes convert 40-60% higher than those taking 6+ hours.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 text-white shadow-2xl border-none overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
          <CardHeader className="relative">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <TrendingUp className="w-8 h-8" />
              </div>
              <CardTitle className="text-3xl text-white font-bold">Your Next Steps</CardTitle>
            </div>
            <CardDescription className="text-cyan-50 text-base mt-2">Gulf Hospitality Action Plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 relative">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="pt-6 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <p className="leading-relaxed">
                    If conversion rate is below 20%, audit response time first. Set a 1-hour response target for
                    WhatsApp and direct inquiries within 7 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="pt-6 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <p className="leading-relaxed">
                    For channels with high commission costs but low conversion (Booking.com below 18%), optimize
                    listings with better photos, pricing clarity, and instant booking options within 14 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="pt-6 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <p className="leading-relaxed">
                    Drive 10% more inquiries to direct channels (website, WhatsApp, Google) within 60 days. Each 1%
                    shift from OTAs to direct saves 15-18% in commissions.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="pt-6 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <p className="leading-relaxed">
                    If unanswered rate is above 10%, implement an automated inquiry acknowledgment system. Guests who
                    receive instant "we got your message" replies are 3x less likely to abandon.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="pt-6 flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <p className="leading-relaxed">
                    Track this audit monthly. Target 25%+ overall conversion and under 90-minute average response time
                    within 90 days.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 border-none shadow-xl">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <Zap className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-bold text-white mb-2">AI Automation for Independent Properties</p>
                    <p className="text-sm text-emerald-50 leading-relaxed">
                      Automate WhatsApp/Instagram inquiry responses in under 60 seconds, even after-hours. AI booking
                      assistants handle availability checks, quote generation, and follow-ups across time zones—so you
                      never lose a guest to slow response again.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
