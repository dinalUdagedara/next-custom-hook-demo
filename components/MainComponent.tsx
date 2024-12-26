"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Building, MapPin, Phone, Mail } from "lucide-react";
import useFetchData from "@/hooks/useFetchData";
import { User } from "@/types/types";

function MainComponent() {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Directory</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((user: User) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{user.name}</span>
                <span className="text-sm text-gray-500">@{user.username}</span>
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="contact" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="contact" className="w-1/2">
                    Contact
                  </TabsTrigger>
                  <TabsTrigger value="company" className="w-1/2">
                    Company
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="contact">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <a
                        href={`mailto:${user.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {user.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{user.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {user.website}
                      </a>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                      <div>
                        <p>{user.address.street}</p>
                        <p>{user.address.suite}</p>
                        <p>
                          {user.address.city}, {user.address.zipcode}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="company">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{user.company.name}</span>
                    </div>
                    <p className="text-sm italic">
                      <p className="text-sm italic">
                        &ldquo;{user.company.catchPhrase}&rdquo;
                      </p>
                    </p>
                    <p className="text-sm text-gray-500">{user.company.bs}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MainComponent;
