package vau.ac.lk.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vau.ac.lk.backend.models.Bid;
import vau.ac.lk.backend.models.Product;
import vau.ac.lk.backend.repositories.BidRepository;
import vau.ac.lk.backend.repositories.ProductRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Bid> getBidsBySeller(String sellerId) {
        List<Product> sellerProducts = productRepository.findBySellerId(sellerId);
        List<Bid> sellerBids = new ArrayList<>();
        for (Product product : sellerProducts) {
            sellerBids.addAll(bidRepository.findByProductId(product.getId()));
        }
        return sellerBids;
    }
}
