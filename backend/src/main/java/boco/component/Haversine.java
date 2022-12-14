package boco.component;


public class Haversine {
    private Haversine() {}
    public static final double EARTH_RAD  = 6371000;

    public static double distance(double lat1, double long1, double lat2, double long2){
        double deltaLat = toRad(lat2-lat1);
        double deltaLong = toRad(long2-long1);

        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2))
                 * Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
        double c = 2* Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        if (deltaLat == 0.0 && (lat1 == 90 || lat2 == -90)){ //If both positions are on the north pole
            return 0;
        }
        return c * EARTH_RAD;

    }

    public static double toRad(double d){
        return d*Math.PI / 180;
    }

}
