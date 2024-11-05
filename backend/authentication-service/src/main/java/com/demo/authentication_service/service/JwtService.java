package com.demo.authentication_service.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    // Use a base64-encoded secret key for HMAC
    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    // Validate token and return boolean indicating validity
//    public boolean validateToken(String token) {
////        try {
////            Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
////            return true; // Token is valid
////        } catch (Exception e) {
////            // Log the exception for debugging
////            System.err.println("Invalid JWT token: " + e.getMessage());
////            return false; // Token is invalid
////        }
//
//    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            // Log the exception (optional)
            return false;
        }
    }


    // Generate a new token for the given username
    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        // Add any additional claims if necessary
        return createToken(claims, userName);
    }

    // Create the JWT token with claims
    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30)) // 30 minutes
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Get signing key from the base64-encoded secret
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

//    // Extract the username from the token
//    public String extractUsername(String token) {
//        return extractAllClaims(token).getSubject();
//    }
//
//    // Extract all claims from the token
//    private Claims extractAllClaims(String token) {
//        return Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
//    }
}
