'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, Clock } from 'lucide-react';

const AVAILABLE_TIMES = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
];

export default function RestaurantBooking() {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState<string>('2');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would make an API call to the backend
    setBookingConfirmed(true);
    setStep(3);
  };

  if (bookingConfirmed) {
    return (
      <Card className="bg-white/95 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-green-600">
            Booking Confirmed!
          </CardTitle>
          <CardDescription className="text-center">
            Thank you for choosing Restaurant Indian Eats!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-t border-b py-4 space-y-2">
            <p className="flex items-center justify-between">
              <span className="font-medium">Date:</span>
              <span>{date && format(date, 'MMMM do, yyyy')}</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="font-medium">Time:</span>
              <span>{time}</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="font-medium">Guests:</span>
              <span>{guests}</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="font-medium">Name:</span>
              <span>{name}</span>
            </p>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            A confirmation email has been sent to {email}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>Reserve Your Table</CardTitle>
        <CardDescription>
          {step === 1
            ? 'Select your preferred date and time'
            : 'Complete your booking details'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <Label className="mb-2 block">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <Label className="mb-2 block">Select Time</Label>
                    <Select onValueChange={setTime} value={time}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {AVAILABLE_TIMES.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="mb-2 block">Number of Guests</Label>
                    <Select onValueChange={setGuests} value={guests}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!date || !time || !guests}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{date && format(date, 'MMMM do, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>
                    {guests} {parseInt(guests) === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button type="submit" className="flex-1">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}