package edu.uclm.esi.videochat.model;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.google.gson.JsonObject;

public class ps {

	public static void main(String[] args) throws Exception {
		String url = "http://F7IS6HCL7S2A6FGMYI2J7NPXMI95S92C@localhost/tienda/api/products/?output_format=JSON";
		JSONObject jso =  getJSON(url);
		System.out.println(jso);
		
		JSONArray jsa = jso.getJSONArray("products");
		for (int i = 0; i < jsa.length(); i++) {
			JSONObject jsoProduct = jsa.getJSONObject(i);
			int id = jsoProduct.getInt("id");
			 url = "http://F7IS6HCL7S2A6FGMYI2J7NPXMI95S92C@localhost/tienda/api/products/"+id+"/?output_format=JSON";
			 JSONObject jsDetallesProducto = getJSON(url);
			 System.out.println("-----");
			 System.out.println(jsDetallesProducto);
			 System.out.println("-----");
		}
	}

		private static JSONObject getJSON(String url) throws Exception {
			try(CloseableHttpClient httpClient = HttpClients.createDefault()) {
				HttpGet request = new HttpGet(url);
				CloseableHttpResponse response = httpClient.execute(request);
				HttpEntity entity = response.getEntity();
				String result = EntityUtils.toString(entity);
				if (result.length()>0 && !result.equals("[]") && !result.equals("{}"))
					return new JSONObject(result);
				return null;
			
		}
			
			

		}

}
